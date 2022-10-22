import BaseDialog from "../../common/uilib/dialog/BaseDialog";
import { Field, FieldProps, Form, Formik } from "formik";
import Input from "../../common/uilib/Input";
import classNames from "classnames";
import Button from "../../common/uilib/Button";
import { useCreateSchoolMutation, useGetSchoolByUuidQuery, useUpdateSchoolMutation } from "../../app/enhancedApi";
import { useEffect, useState, FocusEvent } from "react";
import Alert from "../../common/uilib/Alert";
import * as yup from "yup";
import LoadingSpinner from "../../common/uilib/LoadingSpinner";

interface Props {
  show: boolean;
  onClose: () => void;
  uuid?: string;
}

interface FormValues {
  name: string;
  countryCode: string;
  city: string;
  addressLineOne: string;
  addressLineTwo: string;
  postalCode: string;
}

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Required.")
    .test("length test", "Value is too long.", (value) => (value ? value.length <= 256 : false)),
  countryCode: yup
    .string()
    .required("Required.")
    .test("length test", "Value is too long.", (value) => (value ? value.length <= 3 : false))
    .test("value test", "Must be a 3 letter code.", (value) => (value ? /^[a-zA-Z]{3}$/.test(value) : false)),
  city: yup
    .string()
    .required("Required.")
    .test("length test", "Value is too long.", (value) => (value ? value.length <= 128 : false)),
  addressLineOne: yup
    .string()
    .required("Required.")
    .test("length test", "Value is too long.", (value) => (value ? value.length <= 256 : false)),
  addressLineTwo: yup
    .string()
    .nullable()
    .test("length test", "Value is too long.", (value) => (value ? value.length <= 256 : true)),
  postalCode: yup
    .string()
    .required("Required.")
    .test("length test", "Value is too long.", (value) => (value ? value.length <= 10 : false))
    .test("value test", "Invalid format.", (value) => (value ? /^[a-zA-Z0-9\-]{3,10}$/.test(value) : false)),
});

const initialState: FormValues = {
  name: "",
  countryCode: "",
  city: "",
  addressLineOne: "",
  addressLineTwo: "",
  postalCode: "",
};

export default function SchoolFormDialog(props: Props) {
  const { show, onClose, uuid } = props;
  const [createSchool, createResult] = useCreateSchoolMutation();
  const [updateSchool, updateResult] = useUpdateSchoolMutation();
  const { data, isSuccess, isError, isFetching } = useGetSchoolByUuidQuery(
    { uuid: uuid! },
    { skip: uuid === undefined }
  );

  useEffect(() => {
    if (createResult.isSuccess) {
      setInitialValues(initialValues);
      onClose();
    }
    if (updateResult.isSuccess) {
      setInitialValues(initialValues);
      onClose();
    }
  }, [createResult.isSuccess, updateResult.isSuccess]);

  const [initialValues, setInitialValues] = useState<FormValues>(initialState);

  useEffect(() => {
    setInitialValues(initialState);
    if (isSuccess) {
      setInitialValues({
        name: data.name ?? "",
        countryCode: data.countryCode ?? "",
        city: data.city ?? "",
        addressLineOne: data.addressLineOne ?? "",
        addressLineTwo: data.addressLineTwo ?? "",
        postalCode: data.postalCode ?? "",
      });
    }
  }, [isSuccess, isFetching]);

  return (
    <BaseDialog show={show} title={uuid ? "Edit School" : "Add School"} onClose={onClose}>
      <Formik
        validateOnChange
        validateOnBlur
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (uuid) {
            updateSchool({ updateSchoolRequestDto: { ...values, uuid } });
          } else {
            createSchool({ createSchoolDto: { ...values } });
          }
        }}
      >
        {({ handleReset, handleSubmit, isValid, dirty }) => (
          <Form>
            <div className={classNames("w-full px-3 mb-2", "flex flex-col justify-start gap-2")}>
              {uuid && isFetching && <LoadingSpinner />}
              {(uuid === undefined || (uuid && !isError)) && (
                <>
                  <Field name="name">
                    {({ field, meta }: FieldProps) => (
                      <Input
                        {...field}
                        disabled={uuid !== undefined && (isFetching || isError)}
                        fullWidth
                        labelValue="Name"
                        error={meta.error && meta.touched && field.value !== meta.initialValue ? meta.error : undefined}
                      />
                    )}
                  </Field>
                  <Field name="countryCode">
                    {({ field, meta }: FieldProps) => (
                      <Input
                        {...field}
                        disabled={uuid !== undefined && (isFetching || isError)}
                        fullWidth
                        labelValue="Country Code"
                        error={meta.error && meta.touched && field.value !== meta.initialValue ? meta.error : undefined}
                      />
                    )}
                  </Field>
                  <Field name="city">
                    {({ field, meta }: FieldProps) => (
                      <Input
                        {...field}
                        disabled={uuid !== undefined && (isFetching || isError)}
                        fullWidth
                        labelValue="City"
                        error={meta.error && meta.touched && field.value !== meta.initialValue ? meta.error : undefined}
                      />
                    )}
                  </Field>
                  <Field name="addressLineOne">
                    {({ field, meta }: FieldProps) => (
                      <Input
                        {...field}
                        disabled={uuid !== undefined && (isFetching || isError)}
                        fullWidth
                        labelValue="Address Line 1"
                        error={meta.error && meta.touched && field.value !== meta.initialValue ? meta.error : undefined}
                      />
                    )}
                  </Field>
                  <Field name="addressLineTwo">
                    {({ field, meta }: FieldProps) => (
                      <Input
                        {...field}
                        disabled={uuid !== undefined && (isFetching || isError)}
                        fullWidth
                        labelValue="Address Line 2"
                        error={meta.error && meta.touched && field.value !== meta.initialValue ? meta.error : undefined}
                      />
                    )}
                  </Field>
                  <Field name="postalCode">
                    {({ field, meta, form: { setFieldValue } }: FieldProps) => (
                      <Input
                        {...field}
                        disabled={uuid !== undefined && (isFetching || isError)}
                        onBlur={(e: FocusEvent) => {
                          setFieldValue(field.name, field.value.toUpperCase());
                          field.onBlur(e);
                        }}
                        fullWidth
                        labelValue="Postal Code"
                        error={meta.error && meta.touched && field.value !== meta.initialValue ? meta.error : undefined}
                      />
                    )}
                  </Field>
                </>
              )}
              {uuid === undefined && (
                <Alert show={createResult.isError} fullWidth>
                  An error occurred while adding a school. Reload or try again later.
                </Alert>
              )}
              {uuid && (
                <Alert show={updateResult.isError} fullWidth>
                  An error occurred while updating a school. Reload or try again later.
                </Alert>
              )}
              {uuid && isError && (
                <Alert show={isError} fullWidth>
                  An error occurred while loading current data for school. Reload or try again later.
                </Alert>
              )}
            </div>

            <div
              className={classNames(
                "flex flex-row justify-end items-center gap-2 w-full",
                "bg-slate-50 dark:bg-slate-900",
                "p-3"
              )}
            >
              <Button
                type="button"
                disabled={createResult.isLoading || updateResult.isLoading}
                onClick={() => handleReset()}
              >
                Reset Form
              </Button>
              <Button
                type="button"
                loading={createResult.isLoading || updateResult.isLoading}
                disabled={!isValid || !dirty}
                variant="accent"
                onClick={() => handleSubmit()}
              >
                {uuid ? "Update School" : "Add School"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </BaseDialog>
  );
}
