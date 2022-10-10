import React from "react";
import Combobox, { ComboBoxState } from "../../common/uilib/Combobox";
import { useNavigate } from "react-router-dom";
import { useSearchChannelsMutation } from "../../app/enhancedApi";
import { Field, FieldProps, Form, Formik } from "formik";

interface Props {
  onSelected: () => void;
}

interface ChannelSearchFormValues {
  channel: ComboBoxState | null;
}

const initialValues: ChannelSearchFormValues = { channel: null };

const ChannelSearch: React.FC<Props> = ({ onSelected }) => {
  const navigate = useNavigate();
  const [searchChannels, { data }] = useSearchChannelsMutation();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={({ channel }, { resetForm }) => {
          if (channel && channel.value.length > 0) {
            navigate(`/channels/${channel.value}`);
            resetForm();
            onSelected();
          }
        }}
      >
        <Form>
          <Field name="channel">
            {({ field, form: { handleSubmit, setFieldValue } }: FieldProps) => (
              <Combobox
                name="channel"
                placeholder="Search channels..."
                onChange={(value) => {
                  setFieldValue(field.name, value);
                  handleSubmit();
                }}
                onInputChange={(value) => searchChannels({ getChannelsSearchSuggestionsRequestDto: { value } })}
                options={data ? data.channels : []}
                wait={1000}
                resetOnChange
              />
            )}
          </Field>
        </Form>
      </Formik>
    </div>
  );
};

export default ChannelSearch;
