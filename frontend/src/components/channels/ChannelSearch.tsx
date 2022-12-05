import React, { useEffect, useState } from "react";
import Combobox, { ComboBoxState } from "../uilib/Combobox";
import { useNavigate } from "react-router-dom";
import { useSearchChannelsMutation } from "../../app/enhancedApi";
import { Field, FieldProps, Form, Formik } from "formik";
import { ChannelsSearchSuggestionDto } from "../../app/api";

interface Props {
  onSelected: () => void;
}

interface ChannelSearchFormValues {
  channel: ComboBoxState | null;
}

const initialValues: ChannelSearchFormValues = { channel: null };

export default function ChannelSearch(props: Props) {
  const { onSelected } = props;
  const navigate = useNavigate();
  const [searchChannels, { data, isLoading, isUninitialized, reset }] = useSearchChannelsMutation();

  const [options, setOptions] = useState<ChannelsSearchSuggestionDto[]>([]);

  useEffect(() => {
    if (data && data.channels) {
      setOptions(data.channels);
    }
  }, [data]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={({ channel }, { resetForm }) => {
        if (channel && channel.value.length > 0) {
          resetForm();
          onSelected();
          navigate(`/channels/${channel.value}`);
        }
      }}
    >
      <Form className="w-full">
        <Field name="channel">
          {({ field, form: { handleSubmit, setFieldValue } }: FieldProps) => (
            <Combobox
              name="channel"
              placeholder="Search channels..."
              loading={isLoading}
              isUninitialized={isUninitialized}
              onFocus={() => {
                setOptions([]);
              }}
              onChange={(value) => {
                setFieldValue(field.name, value);
                handleSubmit();
              }}
              onInputChange={(value) => {
                onSelected();
                if (value.length > 0) {
                  searchChannels({ searchChannelsRequestDto: { value } });
                }
              }}
              onBlur={() => {
                reset();
              }}
              options={options}
              wait={1000}
              resetOnChange
              gap="top-12"
            />
          )}
        </Field>
      </Form>
    </Formik>
  );
}
