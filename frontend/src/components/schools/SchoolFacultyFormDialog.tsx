import BaseDialog from "../uilib/dialog/BaseDialog";
import { Field, FieldProps, Form, Formik } from "formik";
import Input from "../uilib/Input";
import classNames from "classnames";
import Button from "../uilib/Button";
import {
  useCreateFacultyMutation,
  useCreateSchoolMutation,
  useGetFacultyByUuidQuery,
  useGetSchoolByUuidQuery,
  useUpdateFacultyMutation,
  useUpdateSchoolMutation,
} from "../../app/enhancedApi";
import { useEffect, useState, FocusEvent } from "react";
import Alert from "../uilib/Alert";
import * as yup from "yup";
import LoadingSpinner from "../uilib/LoadingSpinner";
import { useParams } from "react-router-dom";
import Select from "../uilib/Select";
import { countries } from "../../util/countries";

interface Props {
  show: boolean;
  onClose: () => void;
  type: "school" | "faculty";
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
    .test("value test", "Invalid format.", (value) => (value ? /^[a-zA-Z0-9\- ]{3,10}$/.test(value) : false)),
});

const initialState: FormValues = {
  name: "",
  countryCode: "CZE",
  city: "",
  addressLineOne: "",
  addressLineTwo: "",
  postalCode: "",
};

export default function SchoolFacultyFormDialog(props: Props) {
  const { show, onClose, uuid, type } = props;
  const { schoolUuid } = useParams();
  const [createSchool, createSchoolResult] = useCreateSchoolMutation();
  const [updateSchool, updateSchoolResult] = useUpdateSchoolMutation();
  const [createFaculty, createFacultyResult] = useCreateFacultyMutation();
  const [updateFaculty, updateFacultyResult] = useUpdateFacultyMutation();
  const {
    data: school,
    isSuccess: schoolSuccess,
    isError: schoolError,
    isFetching: schoolFetching,
  } = useGetSchoolByUuidQuery({ uuid: uuid! }, { skip: uuid === undefined || type === "faculty" });
  const {
    data: faculty,
    isSuccess: facultySuccess,
    isError: facultyError,
    isFetching: facultyFetching,
  } = useGetFacultyByUuidQuery({ uuid: uuid! }, { skip: uuid === undefined || type === "school" });

  useEffect(() => {
    if (createSchoolResult.isSuccess) {
      setInitialValues(initialValues);
      onClose();
    }
    if (updateSchoolResult.isSuccess) {
      setInitialValues(initialValues);
      onClose();
    }
  }, [createSchoolResult.isSuccess, updateSchoolResult.isSuccess]);

  useEffect(() => {
    if (createFacultyResult.isSuccess) {
      setInitialValues(initialValues);
      onClose();
    }
    if (updateFacultyResult.isSuccess) {
      setInitialValues(initialValues);
      onClose();
    }
  }, [createFacultyResult.isSuccess, updateFacultyResult.isSuccess]);

  const [initialValues, setInitialValues] = useState<FormValues>(initialState);

  useEffect(() => {
    setInitialValues(initialState);
    if (type === "school" && schoolSuccess && school) {
      setInitialValues({
        name: school.name ?? "",
        countryCode: school.countryCode ?? "",
        city: school.city ?? "",
        addressLineOne: school.addressLineOne ?? "",
        addressLineTwo: school.addressLineTwo ?? "",
        postalCode: school.postalCode ?? "",
      });
    }
    if (type === "faculty" && facultySuccess && faculty) {
      setInitialValues({
        name: faculty.name ?? "",
        countryCode: faculty.countryCode ?? "",
        city: faculty.city ?? "",
        addressLineOne: faculty.addressLineOne ?? "",
        addressLineTwo: faculty.addressLineTwo ?? "",
        postalCode: faculty.postalCode ?? "",
      });
    }
  }, [schoolSuccess, schoolFetching, facultySuccess, facultyFetching]);

  return (
    <BaseDialog
      show={show}
      title={
        uuid && type === "school"
          ? "Edit School"
          : type === "school"
          ? "Add School"
          : uuid && type === "faculty"
          ? "Edit Faculty"
          : "Add Faculty"
      }
      onClose={onClose}
    >
      <Formik
        validateOnChange
        validateOnBlur
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (uuid && type === "school") {
            updateSchool({ updateSchoolRequestDto: { ...values, uuid } });
          } else if (type === "school") {
            createSchool({ createSchoolDto: { ...values } });
          } else if (uuid && type === "faculty") {
            updateFaculty({ updateFacultyRequestDto: { ...values, uuid } });
          } else if (type === "faculty" && schoolUuid) {
            createFaculty({ createFacultyDto: { ...values, schoolUuid } });
          }
        }}
      >
        {({ handleReset, handleSubmit, isValid, dirty }) => (
          <Form>
            <div className={classNames("w-full px-3 mb-2", "flex flex-col justify-start gap-2")}>
              {uuid && (schoolFetching || facultyFetching) && <LoadingSpinner />}
              {(uuid === undefined ||
                (uuid && ((type === "school" && !schoolError) || (type === "faculty" && !facultyError)))) && (
                <>
                  <Field name="name">
                    {({ field, meta }: FieldProps) => (
                      <Input
                        {...field}
                        disabled={
                          uuid !== undefined && (schoolFetching || schoolError || facultyFetching || facultyError)
                        }
                        fullWidth
                        labelValue="Name"
                        error={meta.error && meta.touched && field.value !== meta.initialValue ? meta.error : undefined}
                      />
                    )}
                  </Field>
                  <Field name="countryCode">
                    {({ field, meta }: FieldProps) => <Select {...field} options={countries} labelValue="Country" />}
                  </Field>
                  <Field name="city">
                    {({ field, meta }: FieldProps) => (
                      <Input
                        {...field}
                        disabled={
                          uuid !== undefined && (schoolFetching || schoolError || facultyFetching || facultyError)
                        }
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
                        disabled={
                          uuid !== undefined && (schoolFetching || schoolError || facultyFetching || facultyError)
                        }
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
                        disabled={
                          uuid !== undefined && (schoolFetching || schoolError || facultyFetching || facultyError)
                        }
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
                        disabled={
                          uuid !== undefined && (schoolFetching || schoolError || facultyFetching || facultyError)
                        }
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
                <Alert
                  show={
                    (type === "school" && createSchoolResult.isError) ||
                    (type === "faculty" && createFacultyResult.isError)
                  }
                  fullWidth
                >
                  {`Error creating a ${type}. Reload or try again later.`}
                </Alert>
              )}
              {uuid && (
                <Alert
                  show={
                    (type === "school" && updateSchoolResult.isError) ||
                    (type === "faculty" && updateFacultyResult.isError)
                  }
                  fullWidth
                >
                  {`Error updating the ${type}. Reload or try again later.`}
                </Alert>
              )}
              {uuid && ((type === "school" && schoolError) || (type === "faculty" && facultyError)) && (
                <Alert show={schoolError} fullWidth>
                  {`Error loading the ${type}. Reload or try again later.`}
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
                disabled={
                  (type === "school" && (createSchoolResult.isLoading || updateSchoolResult.isLoading)) ||
                  (type === "faculty" && (createFacultyResult.isLoading || updateFacultyResult.isLoading))
                }
                onClick={() => handleReset()}
              >
                Reset Form
              </Button>
              <Button
                type="button"
                loading={
                  (type === "school" && (createSchoolResult.isLoading || updateSchoolResult.isLoading)) ||
                  (type === "faculty" && (createFacultyResult.isLoading || updateFacultyResult.isLoading))
                }
                disabled={!isValid || !dirty}
                variant="accent"
                onClick={() => handleSubmit()}
              >
                {uuid ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </BaseDialog>
  );
}
