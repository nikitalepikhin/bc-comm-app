import classNames from "classnames";
import { format, parseISO } from "date-fns";
import { Field, FieldProps, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { RepresentativeRequestDto, TeacherRequestDto } from "../../app/api";
import { useVerifyUserMutation } from "../../app/enhancedApi";
import Alert from "../uilib/Alert";
import Button from "../uilib/Button";
import Container from "../uilib/Container";
import BaseDialog from "../uilib/dialog/BaseDialog";
import Textarea from "../uilib/Textarea";
import * as yup from "yup";

interface FormValues {
  approve: boolean;
  reason: string;
}

const initialValues: FormValues = {
  approve: true,
  reason: "",
};

interface Props {
  request: RepresentativeRequestDto | TeacherRequestDto;
  type: "TEACHER" | "REPRESENTATIVE";
}

const validationSchema = yup.object({
  reason: yup
    .string()
    .test("length", "Value is too long", (value, { parent }) => {
      if (parent.approve) {
        return true;
      } else {
        return value ? value.length <= 300 : true;
      }
    })
    .test("required", "Required", (value, { parent }) => {
      if (parent.approve) {
        return true;
      } else {
        return value !== undefined && value.length > 0;
      }
    }),
});

export default function Request(props: Props) {
  const { request, type } = props;
  const [showDialog, setShowDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [verifyUser, { isLoading, isError, isSuccess }] = useVerifyUserMutation();

  useEffect(() => {
    if (isError || isSuccess) {
      setShowDialog(false);
    }
    if (isError) {
      setShowAlert(true);
    }
  }, [isError, isSuccess]);

  return (
    <Formik
      validateOnChange
      validateOnBlur
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={({ reason }) => {
        verifyUser({
          verifyUserRequestDto: {
            type,
            verifiedUserUuid: request.user.uuid,
            approve: reason.length <= 0,
            reason: reason.length > 0 ? reason : null,
          },
        });
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <>
          {console.log(values)}
          <Form>
            <Container
              title={type === "TEACHER" ? "Teacher Request" : "Representative Request"}
              actions={[
                <Button
                  key="decline"
                  type="button"
                  variant="danger"
                  onClick={() => {
                    setShowDialog(true);
                    setFieldValue("approve", false);
                  }}
                >
                  Decline
                </Button>,
                <Button
                  key="approve"
                  type="button"
                  variant="accent"
                  onClick={() => handleSubmit()}
                  loading={isLoading && values.reason.length === 0}
                >
                  Approve
                </Button>,
              ]}
            >
              <div
                className={classNames(
                  "flex flex-col justify-start items-start gap-2 w-full",
                  "divide-y divide-slate-200 dark:divide-slate-700",
                  "text-secondary dark:text-slate-400 text-sm"
                )}
              >
                <div className="flex flex-col justify-start gap-1 w-full">
                  <h2 className="font-bold text-base text-primary dark:text-white">User</h2>
                  <div className="flex justify-start gap-2 w-full">
                    <div className="text-primary dark:text-white">UUID</div>
                    <div>{request.user.uuid}</div>
                  </div>
                  <div className="flex justify-start gap-2 w-full">
                    <div className="text-primary dark:text-white">Email</div>
                    <div>{request.user.email}</div>
                  </div>
                  <div className="flex justify-start gap-2 w-full">
                    <div className="text-primary dark:text-white">Username</div>
                    <div>{request.user.username}</div>
                  </div>
                  <div className="flex justify-start gap-2 w-full">
                    <div className="text-primary dark:text-white">Name</div>
                    <div>{request.user.name}</div>
                  </div>
                  <div className="flex justify-start gap-2 w-full">
                    <div className="text-primary dark:text-white">Date Created</div>
                    <div>{format(parseISO(request.user.created), "dd.MM.yyyy HH:mm:ss")}</div>
                  </div>
                </div>
                <div className="flex flex-col justify-start gap-1 w-full">
                  <h2 className="font-bold text-base text-primary dark:text-white">School</h2>
                  <div className="flex justify-start gap-2 w-full">
                    <div className="text-primary dark:text-white">UUID</div>
                    <div>{request.school.uuid}</div>
                  </div>
                  <div className="flex justify-start gap-2 w-full">
                    <div className="text-primary dark:text-white">Name</div>
                    <div>{request.school.name}</div>
                  </div>
                </div>
                <Alert show={showAlert} fullWidth onClose={() => setShowAlert(false)}>
                  An error occurred while verifying this request. Please try again.
                </Alert>
              </div>
            </Container>
            <BaseDialog
              show={showDialog}
              onClose={() => {
                setShowDialog(false);
                setFieldValue("approve", true);
              }}
              title="Decline Request"
            >
              <div className={classNames("flex flex-col justify-start items-center gap-2", "p-3 pt-0")}>
                <Field name="reason">
                  {({ field, meta }: FieldProps) => (
                    <Textarea
                      {...field}
                      fullWidth
                      labelValue="Reason"
                      error={meta.touched && meta.error ? meta.error : undefined}
                      placeholder="Please provide a reason for declining verification here..."
                      showCharCount
                      maxLength={300}
                    />
                  )}
                </Field>
                <Button
                  type="button"
                  variant="danger"
                  loading={isLoading}
                  onClick={() => handleSubmit()}
                  disabled={values.reason.length === 0}
                  className="ml-auto"
                >
                  Decline
                </Button>
              </div>
            </BaseDialog>
          </Form>
        </>
      )}
    </Formik>
  );
}
