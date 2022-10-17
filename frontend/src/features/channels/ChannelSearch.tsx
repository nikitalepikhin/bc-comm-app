import React, { useEffect, useState } from "react";
import Combobox, { ComboBoxState } from "../../common/uilib/Combobox";
import { useNavigate } from "react-router-dom";
import { enhancedApi, useLazySearchChannelsQuery } from "../../app/enhancedApi";
import { Field, FieldProps, Form, Formik } from "formik";
import { TagTypes } from "../../app/emptyApi";
import { ChannelsSearchSuggestionDto } from "../../app/api";

interface Props {
  onSelected: () => void;
}

interface ChannelSearchFormValues {
  channel: ComboBoxState | null;
}

const invalidateTags = () => enhancedApi.util.invalidateTags([{ type: TagTypes.CHANNEL_AC }]);

const initialValues: ChannelSearchFormValues = { channel: null };

export default function ChannelSearch(props: Props) {
  const { onSelected } = props;
  const navigate = useNavigate();
  const [searchChannels, { data, isFetching, isUninitialized }] = useLazySearchChannelsQuery();

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
              loading={isFetching}
              isUninitialized={isUninitialized}
              onChange={(value) => {
                setFieldValue(field.name, value);
                invalidateTags();
                setOptions([]);
                handleSubmit();
              }}
              onInputChange={(value) => {
                onSelected();
                setOptions([]);
                if (value.length > 0) {
                  searchChannels({ value });
                }
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
