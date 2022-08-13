import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCreateFacultyMutation, useCreateSchoolMutation, useGetSchoolByUuidQuery } from "../../app/enhancedApi";
import { Field, FieldProps, Form, Formik } from "formik";
import AddSchoolFeedback from "../schools/AddSchoolFeedback";
import TextField from "../../common/ui/TextField";
import Button from "../../common/components/Button";
import LinkWithIcon from "../../common/ui/LinkWithIcon";

interface AddFacultyFormValues {
  name: string;
  countryCode: string;
  city: string;
  addressLineOne: string;
  addressLineTwo: string;
  postalCode: string;
}

const initialValues: AddFacultyFormValues = {
  name: "",
  countryCode: "",
  city: "",
  addressLineOne: "",
  addressLineTwo: "",
  postalCode: "",
};

const AddFacultyPage: React.FC = () => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const { schoolUuid } = useParams();

  const [addFaculty, { isSuccess, isLoading, isError }] = useCreateFacultyMutation();
  const { data, isSuccess: isGetSchoolByUuidSuccess } = useGetSchoolByUuidQuery({ uuid: schoolUuid! });

  useEffect(() => {
    if (isSuccess) {
      setMessage("Successfully created a new faculty.");
    }
    if (isError) {
      setError("Error while creating a new faculty. Please check the provided values.");
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <LinkWithIcon
        to={`/faculties/${schoolUuid}`}
        svg={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        Back to the faculties table
      </LinkWithIcon>
      <div className="text-2xl font-bold text-center mx-auto mb-1 mt-4">{`Create New Faculty${
        isGetSchoolByUuidSuccess ? ` for ${data?.name}` : ""
      }`}</div>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          await addFaculty({ createFacultyDto: { ...values, schoolUuid: schoolUuid! } });
          resetForm();
        }}
      >
        {({ handleReset, handleSubmit }) => {
          return (
            <Form className="flex flex-col justify-start items-center gap-4">
              {message !== undefined && <AddSchoolFeedback message={message} setMessage={setMessage} />}
              {error !== undefined && <AddSchoolFeedback message={error} setMessage={setError} isError />}

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
                <Button onClick={handleSubmit}>Create school</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddFacultyPage;
