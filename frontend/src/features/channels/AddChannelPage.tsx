import React, { useCallback } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import Button from "../../common/components/Button";
import { useCreateChannelMutation, useLazyCheckChannelIdAvailabilityQuery } from "../../app/enhancedApi";
import * as yup from "yup";
// import { debounce } from "lodash";

interface AddChannelFormValues {
  textId: string;
  name: string;
  description?: string;
}

const initialValues: AddChannelFormValues = {
  textId: "",
  name: "",
  description: "",
};

const validationSchema = yup.object({
  textId: yup.string(),
  name: yup.string().required("Required."),
  description: yup.string().nullable(),
});

const AddChannelPage: React.FC = () => {
  const [createChannel, { data, isLoading, isError, error }] = useCreateChannelMutation();
  const [checkChannelIdAvailability, { data: channelIdAvailability, isError: checkChannelIdAvailabilityIsError }] =
    useLazyCheckChannelIdAvailabilityQuery();

  // todo - figure out how to make the debounced version of this work
  const callbackCheckChannelIdAvailability = useCallback(async (value: string, setFieldTouched: any) => {
    if (value.length > 0) {
      const data = await checkChannelIdAvailability({ value }, true).unwrap();
      if (data.exists) {
        setFieldTouched("textId", true);
        return "Specified text ID is already taken.";
      }
      return undefined;
    }
  }, []);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={false}
        validateOnMount={false}
        onSubmit={async (values, { resetForm }) => {
          try {
            await createChannel({
              createChannelRequestDto: {
                textId: values.textId,
                name: values.name,
                description: values.description ?? "",
              },
            }).unwrap();
            resetForm();
          } catch (e) {}
        }}
      >
        {({ setFieldTouched, isValid }) => (
          <Form>
            <h1>Create New Channel</h1>
            <Field
              name="textId"
              validate={async (value: string) => await callbackCheckChannelIdAvailability(value, setFieldTouched)}
            >
              {({ field, meta }: FieldProps) => (
                <div className="flex flex-col gap-1 justify-start items-start">
                  <label htmlFor={field.name}>Text ID</label>
                  <input
                    type="text"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setFieldTouched(field.name, true);
                    }}
                  />
                  {meta.error && meta.touched && <div className="text-red">{meta.error}</div>}
                </div>
              )}
            </Field>
            <Field name="name">
              {({ field, meta }: FieldProps) => (
                <div className="flex flex-col gap-1 justify-start items-start">
                  <label htmlFor={field.name}>Channel Name</label>
                  <input type="text" {...field} />
                  {meta.error && meta.touched && <div className="text-red">{meta.error}</div>}
                </div>
              )}
            </Field>
            <Field name="description">
              {({ field, meta }: FieldProps) => (
                <div className="flex flex-col gap-1 justify-start items-start">
                  <label htmlFor={field.name}>Channel Description</label>
                  <textarea {...field} />
                  {meta.error && meta.touched && <div className="text-red">{meta.error}</div>}
                </div>
              )}
            </Field>
            <Button type="submit" disabled={!isValid}>
              Create Channel
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddChannelPage;
