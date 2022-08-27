import React, { useEffect, useState } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import TextField from "../../common/ui/TextField";
import Button from "../../common/components/Button";
import { useCreateSchoolMutation } from "../../app/enhancedApi";
import AddSchoolFeedback from "./AddSchoolFeedback";
import LinkWithIcon from "../../common/ui/LinkWithIcon";

interface AddSchoolFormValues {
  name: string;
  countryCode: string;
  city: string;
  addressLineOne: string;
  addressLineTwo: string;
  postalCode: string;
}

const initialValues: AddSchoolFormValues = {
  name: "",
  countryCode: "",
  city: "",
  addressLineOne: "",
  addressLineTwo: "",
  postalCode: "",
};

const AddSchoolPage: React.FC = () => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const [addSchool, { isSuccess, isLoading, isError }] = useCreateSchoolMutation();

  useEffect(() => {
    if (isSuccess) {
      setMessage("Successfully created a new school.");
    }
    if (isError) {
      setError("Error while creating a new school. Please check the provided values.");
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <LinkWithIcon
        to="/schools"
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
        Back to the schools table
      </LinkWithIcon>
      <div className="bg-white shadow rounded-md overflow-hidden my-4 w-full">
        <div className="text-2xl font-medium text-center mx-auto mb-4 mt-4">Create New School</div>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            await addSchool({ createSchoolDto: values });
            resetForm();
          }}
        >
          {({ handleReset, handleSubmit }) => {
            return (
              <Form className="flex flex-col justify-start items-center gap-4">
                {message !== undefined && <AddSchoolFeedback message={message} setMessage={setMessage} />}
                {error !== undefined && <AddSchoolFeedback message={error} setMessage={setError} isError />}

                <div className="px-4 w-full flex flex-col justify-start items-center gap-4">
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
                </div>

                <div className="flex flex-row justify-center items-center w-full gap-4 bg-gray py-3">
                  <Button type="reset" onClick={handleReset}>
                    Reset form
                  </Button>
                  <Button onClick={() => handleSubmit()} variant="contained">
                    Create school
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddSchoolPage;
