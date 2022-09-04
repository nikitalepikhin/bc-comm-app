import React, { useState } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import { RepresentativeRequestDto, TeacherRequestDto } from "../../app/api";
import {
  useGetRepresentativeVerificationRequestsQuery,
  useGetTeacherVerificationRequestsQuery,
  useVerifyRepresentativeUserMutation,
  useVerifyTeacherUserMutation,
} from "../../app/enhancedApi";
import LoadingSpinner from "../../common/ui/LoadingSpinner";
import Button from "../../common/components/Button";

const initialValues = {
  reason: "",
  approve: false,
};

interface Props {
  request: RepresentativeRequestDto | TeacherRequestDto;
  type: "teacher" | "representative";
}
const VerificationRequest: React.FC<Props> = ({ request, type }) => {
  const userCreatedDate = new Date(Date.parse(request.user.created));
  const [showingReason, setShowingReason] = useState(false);
  const [verifyTeacher, { isLoading: verifyTeacherIsLoading, isSuccess: verifyTeacherIsSuccess }] =
    useVerifyTeacherUserMutation();
  const { isFetching: verifyTeacherIsFetching } = useGetTeacherVerificationRequestsQuery();

  const [verifyRepresentative, { isLoading: verifyRepresentativeIsLoading, isSuccess: verifyRepresentativeIsSuccess }] =
    useVerifyRepresentativeUserMutation();
  const { isFetching: verifyRepresentativeIsFetching } = useGetRepresentativeVerificationRequestsQuery();

  const isLoading = verifyTeacherIsLoading || verifyRepresentativeIsLoading;
  const isSuccess = verifyTeacherIsSuccess || verifyRepresentativeIsSuccess;
  const isFetching = verifyTeacherIsFetching || verifyRepresentativeIsFetching;

  return (
    <div className="flex flex-col justify-center items-start gap-2 rounded-md overflow-hidden w-full md:max-w-2xl shadow bg-white">
      {isLoading && (
        <div className="m-4 flex justify-center items-center w-full">{<LoadingSpinner border="border-2" />}</div>
      )}
      {!isLoading && (
        <>
          <div className="col-span-3 font-bold text-lg pb-2 bg-gray w-full px-4 py-2 pb-2">{`${
            type.charAt(0).toUpperCase() + type.toString().slice(1)
          } Verification`}</div>
          <div className="px-4">
            <div className="grid grid-cols-3">
              <div className="text-secondary">Name:</div>
              <div className="col-span-2">{`${request.user.name}`}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-secondary">Username:</div>
              <div className="col-span-2">{`${request.user.username}`}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-secondary">Email:</div>
              <div className="col-span-2">{`${request.user.email}`}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-secondary">Created:</div>
              <div className="col-span-2">{`${userCreatedDate.toLocaleString("cs-CZ")}`}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-secondary">School Name:</div>
              <div className="col-span-2">{`${request.school.name}`}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-secondary">School UUID:</div>
              <div className="col-span-2">{`${request.school.uuid}`}</div>
            </div>
            {type === "teacher" && (
              <div className="grid grid-cols-3">
                <div className="text-secondary">Faculty Name:</div>
                <div className="col-span-2">{`${(request as TeacherRequestDto).faculty.name}`}</div>
              </div>
            )}
            {type === "teacher" && (
              <div className="grid grid-cols-3">
                <div className="text-secondary">Faculty UUID:</div>
                <div className="col-span-2">{`${(request as TeacherRequestDto).faculty.uuid}`}</div>
              </div>
            )}
          </div>
        </>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          values.approve = values.reason.length <= 0;
          if (type === "teacher") {
            verifyTeacher({
              verifyTeacherUserRequestDto: {
                verifiedUserUuid: request.user.uuid,
                approve: values.approve,
                reason: values.reason,
              },
            });
          } else if (type === "representative") {
            verifyRepresentative({
              verifyRepresentativeUserRequestDto: {
                verifiedUserUuid: request.user.uuid,
                approve: values.approve,
                reason: values.reason,
              },
            });
          }
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form className='className="flex flex-col justify-center items-start gap-2 w-full'>
            <div className="mb-1 px-4">
              {showingReason && (
                <Field name="reason">
                  {({ field }: FieldProps) => (
                    <textarea
                      className="rounded-md border-secondary focus:border-accent focus:ring-accent w-full resize-none h-20 max-h-fit"
                      id="rep-request-msg"
                      placeholder="Provide a reason for the decline here"
                      maxLength={300}
                      disabled={isLoading || isSuccess}
                      {...field}
                    />
                  )}
                </Field>
              )}
            </div>
            <div className="flex flex-row gap-2 justify-start items-center flex-wrap bg-gray px-4 py-3">
              <Button
                variant="contained"
                disabled={values.reason.length > 0 || showingReason || isLoading || isSuccess || isFetching}
                type="submit"
              >
                Approve
              </Button>
              <Button
                disabled={(values.reason.length === 0 && showingReason) || isLoading || isSuccess || isFetching}
                type="submit"
                variant="outlined"
                onClick={(e) => {
                  e.preventDefault();
                  if (showingReason) {
                    handleSubmit();
                  } else {
                    setShowingReason(true);
                  }
                }}
              >
                Decline
              </Button>
              {showingReason && (
                <Button
                  variant="standard"
                  disabled={!showingReason || isLoading || isSuccess || isFetching}
                  onClick={(e) => {
                    e.preventDefault();
                    setFieldValue("reason", "");
                    setShowingReason(false);
                  }}
                >
                  Cancel
                </Button>
              )}
              {values.reason.length > 0 ? (
                <p className="ml-auto text-secondary text-sm pb-4">{values.reason.length}/300</p>
              ) : null}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerificationRequest;
