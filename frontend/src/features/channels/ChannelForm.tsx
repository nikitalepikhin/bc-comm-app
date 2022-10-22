import React, { ChangeEvent, useCallback, useState } from "react";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import Button from "../../common/uilib/Button";
import { useLazyCheckChannelIdAvailabilityQuery } from "../../app/enhancedApi";
import { debounce } from "lodash";
import * as yup from "yup";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Container from "../../common/uilib/Container";
import Input from "../../common/uilib/Input";
import Textarea from "../../common/uilib/Textarea";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../../common/uilib/dialog/Dialog";

export interface FormValues {
  textId: string;
  name: string;
  description?: string;
}

interface Props {
  mode: "create" | "update";
  initialValues: FormValues;
  onSubmit: (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => Promise<void>;
  textIdError: string | undefined;
  setTextIdError: (value: string | undefined) => void;
}

const validationSchema = yup.object({
  textId: yup.string().required("Required"), // todo - check that the textId does not contain spaces and is otherwise valid
  name: yup.string().required("Required"),
  description: yup.string().nullable(),
});

export default function ChannelForm(props: Props) {
  const { initialValues, onSubmit, textIdError, setTextIdError, mode } = props;
  const { textId } = useParams() as { textId: string };
  const [checkChannelIdAvailability] = useLazyCheckChannelIdAvailabilityQuery();
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();

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
      {({ isValid, dirty, handleSubmit }) => (
        <div className={classNames("flex flex-col justify-start items-stretch w-full gap-2", {})}>
          {mode === "update" && (
            <div className="flex flex-row justify-end items-center w-full">
              <Button
                className="w-full"
                onClick={() => {
                  if (dirty) {
                    setIsExiting(true);
                  } else {
                    navigate(`/channels/${textId}`);
                  }
                }}
                icon={<XMarkIcon className="h-5 w-5" />}
              >
                Close
              </Button>
            </div>
          )}
          <Container
            title={mode === "create" ? "Create New Channel" : "Update Your Channel"}
            actions={
              <Button
                onClick={() => handleSubmit()}
                type="button"
                disabled={!isValid || textIdError !== undefined || !dirty}
              >
                {`${mode === "create" ? "Create" : "Update"} Channel`}
              </Button>
            }
          >
            <Form className="flex flex-col justify-start items-stretch gap-2">
              <Field name="textId">
                {({ field, meta }: FieldProps) => (
                  <Input
                    {...field}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      field.onChange(e);
                      debouncedCheckChannelIdAvailability(e.target.value);
                    }}
                    fullWidth
                    labelValue="Text ID"
                    error={meta.error && meta.touched ? meta.error : undefined}
                  />
                )}
              </Field>
              <Field name="name">
                {({ field, meta }: FieldProps) => (
                  <Input
                    {...field}
                    fullWidth
                    labelValue="Name"
                    error={meta.error && meta.touched ? meta.error : undefined}
                  />
                )}
              </Field>
              <Field name="description">
                {({ field, meta }: FieldProps) => (
                  <Textarea
                    {...field}
                    error={meta.error && meta.touched ? meta.error : undefined}
                    labelValue="Description"
                    fullWidth
                    size="sm"
                    showCharCount
                    maxLength={4000}
                  />
                )}
              </Field>
            </Form>
          </Container>
          <Dialog
            show={isExiting}
            onConfirm={() => navigate(`/channels/${textId}`)}
            onCancel={() => setIsExiting(false)}
            title="Discard Changes"
            body="Are you sure you want to discard your changes? This action cannot be undone."
            danger
          />
        </div>
      )}
    </Formik>
  );
}
