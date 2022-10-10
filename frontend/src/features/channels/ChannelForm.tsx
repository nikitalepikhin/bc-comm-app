import React, { useCallback } from "react";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import Button from "../../common/uilib/Button";
import { useLazyCheckChannelIdAvailabilityQuery } from "../../app/enhancedApi";
import { debounce } from "lodash";
import * as yup from "yup";

export interface ChannelFormValues {
  textId: string;
  name: string;
  description?: string;
}

interface ChannelFormPropsType {
  mode: "create" | "update";
  initialValues: ChannelFormValues;
  onSubmit: (values: ChannelFormValues, formikHelpers: FormikHelpers<ChannelFormValues>) => Promise<void>;
  textIdError: string | undefined;
  setTextIdError: (value: string | undefined) => void;
}

const validationSchema = yup.object({
  textId: yup.string().required("Required"), // todo - check that the textId does not contain spaces and is otherwise valid
  name: yup.string().required("Required"),
  description: yup.string().nullable(),
});

const ChannelForm: React.FC<ChannelFormPropsType> = ({
  initialValues,
  onSubmit,
  textIdError,
  setTextIdError,
  mode,
}) => {
  const [checkChannelIdAvailability] = useLazyCheckChannelIdAvailabilityQuery();

  const debouncedCheckChannelIdAvailability = useCallback(
    debounce(async (value: string) => {
      if (value.length > 0) {
        const data = await checkChannelIdAvailability({ value }, true).unwrap();
        if (data.exists) {
          setTextIdError("Specified text ID is already taken");
        } else {
          setTextIdError(undefined);
        }
      }
    }, 1000),
    []
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange
      validateOnBlur
      validateOnMount={false}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isValid, dirty }) => (
        <Form>
          <h1>{`${mode === "create" ? "Create New" : "Update"} Channel`}</h1>
          <Field name="textId">
            {({ field, meta }: FieldProps) => (
              <div className="flex flex-col gap-1 justify-start items-start">
                <label htmlFor={field.name}>Text ID</label>
                <input
                  type="text"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    debouncedCheckChannelIdAvailability(e.target.value);
                  }}
                />
                {meta.error && meta.touched && <div className="text-red">{meta.error}</div>}
                {textIdError !== undefined && <div className="text-red">{textIdError}</div>}
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
          <Button type="submit" disabled={!isValid || textIdError !== undefined || !dirty}>
            {`${mode === "create" ? "Create" : "Update"} Channel`}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChannelForm;
