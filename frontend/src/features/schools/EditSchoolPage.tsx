import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Field, FieldProps, Form, Formik } from "formik";
import TextField from "../../common/ui/TextField";
import Button from "../../common/components/Button";
import { useGetSchoolByUuidQuery, useUpdateSchoolMutation } from "../../app/enhancedApi";
import { CircularProgress } from "@mui/material";

interface EditSchoolFormValues {
  uuid: string;
  name: string;
  countryCode: string;
  city: string;
  addressLineOne: string;
  addressLineTwo: string;
  postalCode: string;
}

const EditSchoolPage: React.FC = () => {
  const { schoolUuid } = useParams();
  const [initialValues, setInitialValues] = useState<EditSchoolFormValues | undefined>(undefined);
  const { data, isLoading, isFetching } = useGetSchoolByUuidQuery({ uuid: schoolUuid ?? "" });
  const [updateSchool] = useUpdateSchoolMutation();

  useEffect(() => {
    if (data !== undefined) {
      setInitialValues({
        uuid: data.uuid ?? "",
        name: data.name ?? "",
        countryCode: data.countryCode ?? "",
        city: data.city ?? "",
        addressLineOne: data.addressLineOne ?? "",
        addressLineTwo: data.addressLineTwo ?? "",
        postalCode: data.postalCode ?? "",
      });
    }
  }, [data]);

  return initialValues === undefined || isLoading || isFetching ? (
    <div className="flex flex-col justify-center items-center gap-4 my-40">
      <CircularProgress />
      <div>Loading current school values...</div>
    </div>
  ) : (
    <div>
      <div className="text-2xl font-bold text-center mx-auto mb-1 mt-4">Edit School</div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          await updateSchool({ updateSchoolRequestDto: values });
          resetForm();
        }}
      >
        {({ handleReset, handleSubmit }) => {
          return (
            <Form className="flex flex-col justify-start items-center gap-4">
              {/*{message !== undefined && <AddSchoolFeedback message={message} setMessage={setMessage} />}*/}
              {/*{error !== undefined && <AddSchoolFeedback message={error} setMessage={setError} isError />}*/}

              <Link to="/schools" className="text-blue-600 hover:text-blue-800 hover:underline">
                Back to the schools table
              </Link>

              <Field name="name">
                {({ field, form, meta }: FieldProps) => (
                  <TextField
                    id={field.name}
                    type="text"
                    placeholder="Name"
                    label="Name"
                    field={field}
                    wrapperClasses="w-full md:w-1/2"
                  />
                )}
              </Field>

              <Field name="countryCode">
                {({ field, form, meta }: FieldProps) => (
                  <TextField
                    id={field.name}
                    type="text"
                    placeholder="Country Code"
                    label="Country Code"
                    field={field}
                    wrapperClasses="w-full md:w-1/2"
                  />
                )}
              </Field>

              <Field name="city">
                {({ field, form, meta }: FieldProps) => (
                  <TextField
                    id={field.name}
                    type="text"
                    placeholder="City"
                    label="City"
                    field={field}
                    wrapperClasses="w-full md:w-1/2"
                  />
                )}
              </Field>

              <Field name="addressLineOne">
                {({ field, form, meta }: FieldProps) => (
                  <TextField
                    id={field.name}
                    type="text"
                    placeholder="Address Line 1"
                    label="Address Line 1"
                    field={field}
                    wrapperClasses="w-full md:w-1/2"
                  />
                )}
              </Field>

              <Field name="addressLineTwo">
                {({ field, form, meta }: FieldProps) => (
                  <TextField
                    id={field.name}
                    type="text"
                    placeholder="Address Line 2"
                    label="Address Line 2"
                    field={field}
                    wrapperClasses="w-full md:w-1/2"
                  />
                )}
              </Field>

              <Field name="postalCode">
                {({ field, form, meta }: FieldProps) => (
                  <TextField
                    id={field.name}
                    type="text"
                    placeholder="Postal Code"
                    label="Postal Code"
                    field={field}
                    wrapperClasses="w-full md:w-1/2"
                  />
                )}
              </Field>

              <div className="flex flex-row justify-center items-center w-full gap-4">
                <Button type="reset" onClick={handleReset}>
                  Reset form
                </Button>
                <Button onClick={handleSubmit}>Update school</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditSchoolPage;