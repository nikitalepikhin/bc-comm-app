import React, { ChangeEvent, useCallback, useState } from "react";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import Button from "../uilib/Button";
import { useLazyCheckChannelIdAvailabilityQuery } from "../../app/enhancedApi";
import { debounce } from "lodash";
import * as yup from "yup";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Container from "../uilib/Container";
import Input from "../uilib/Input";
import Textarea from "../uilib/Textarea";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../uilib/dialog/Dialog";
import Alert from "../uilib/Alert";
import { useAppSelector } from "../../app/redux/hooks";

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
  isError: boolean;
  isLoading: boolean;
  channelError?: boolean;
  getChannel?: () => void;
}

const validationSchema = yup.object({
  textId: yup
    .string()
    .test("format", "Must only contain numbers and letters.", (value) => (value ? /^[a-z0-9]{2,}$/.test(value) : true))
    .test("length", "Must be between 2 and 20 characters", (value) => {
      if (value) {
        return value.length <= 20 && value.length >= 2;
      } else {
        return true;
      }
    })
    .required("Required"),
  name: yup
    .string()
    .test("length", "Value is too long", (value) => (value ? value.length <= 255 : true))
    .required("Required"),
  description: yup
    .string()
    .test("length", "Value is too long", (value) => (value ? value.length <= 4000 : true))
    .nullable(),
});

export default function ChannelForm(props: Props) {
  const {
    initialValues,
    onSubmit,
    textIdError: channelIdError,
    setTextIdError,
    mode,
    isError,
    isLoading,
    channelError,
    getChannel,
  } = props;
  const { textId } = useParams() as { textId: string };
  const [checkChannelIdAvailability] = useLazyCheckChannelIdAvailabilityQuery();
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();
  const { verified } = useAppSelector((state) => state.auth.user);

  const debouncedCheckChannelIdAvailability = useCallback(
    debounce(async (value: string) => {
      if (value.length > 0) {
        const data = await checkChannelIdAvailability({ value }, true).unwrap();
        if (data.exists) {
          setTextIdError("Channel ID is already taken");
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
          {channelError && getChannel && (
            <Alert show={channelError} fullWidth onClose={() => getChannel()}>
              Error loading the channel. Please try again.
            </Alert>
          )}
          <Container
            title={mode === "create" ? "Create New Channel" : "Update Your Channel"}
            actions={
              <Button
                onClick={() => handleSubmit()}
                loading={isLoading}
                variant="accent"
                type="button"
                disabled={!isValid || channelIdError !== undefined || !dirty || !verified}
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
                    disabled={!verified}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      field.onChange(e);
                      debouncedCheckChannelIdAvailability(e.target.value);
                    }}
                    fullWidth
                    labelValue="Channel ID"
                    error={channelIdError ? channelIdError : meta.error && meta.touched ? meta.error : undefined}
                  />
                )}
              </Field>
              <Field name="name">
                {({ field, meta }: FieldProps) => (
                  <Input
                    disabled={!verified}
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
                    disabled={!verified}
                    error={meta.error && meta.touched ? meta.error : undefined}
                    labelValue="Description"
                    fullWidth
                    size="sm"
                    showCharCount
                    maxLength={4000}
                  />
                )}
              </Field>
              <Alert show={isError} fullWidth>{`Error ${
                mode === "create" ? "creating a" : "updating the"
              } channel.`}</Alert>
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
