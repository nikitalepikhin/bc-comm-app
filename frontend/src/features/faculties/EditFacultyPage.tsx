import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetFacultyByUuidQuery, useUpdateFacultyMutation } from "../../app/enhancedApi";
import { Field, FieldProps, Form, Formik } from "formik";
import TextField from "../../common/uilib/legacy/TextField";
import Button from "../../common/uilib/Button";
import LinkWithIcon from "../../common/uilib/LinkWithIcon";
import LoadingSpinner from "../../common/uilib/LoadingSpinner";

interface EditFacultyFormValues {
  uuid: string;
  name: string;
  countryCode: string;
  city: string;
  addressLineOne: string;
  addressLineTwo: string;
  postalCode: string;
}

const EditFacultyPage: React.FC = () => {
  const { schoolUuid, facultyUuid } = useParams();
  const [initialValues, setInitialValues] = useState<EditFacultyFormValues | undefined>(undefined);
  const { data, isLoading, isFetching } = useGetFacultyByUuidQuery({ uuid: facultyUuid! });
  const [updateFaculty] = useUpdateFacultyMutation();

  useEffect(() => {
    if (data !== undefined) {
      console.log("setting initial values to ", data);
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
      <LoadingSpinner />
      <div>Loading current faculty values...</div>
    </div>
  ) : (
    <div>
      <LinkWithIcon
        to={`/faculties/${schoolUuid}`}
        icon={
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
      <div className="text-2xl font-bold text-center mx-auto mb-1 mt-4">Edit Faculty</div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          await updateFaculty({ updateFacultyRequestDto: values });
          resetForm();
        }}
      >
        {({ handleReset, handleSubmit }) => {
          return (
            <Form className="flex flex-col justify-start items-center gap-4">
              {/*{message !== undefined && <AddSchoolFeedback message={message} setMessage={setMessage} />}*/}
              {/*{error !== undefined && <AddSchoolFeedback message={error} setMessage={setError} isError />}*/}

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
                <Button onClick={() => handleSubmit()}>Update faculty</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditFacultyPage;
