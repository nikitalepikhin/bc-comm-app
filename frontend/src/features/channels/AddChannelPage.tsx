import React, { useState } from "react";
import { useCreateChannelMutation } from "../../app/enhancedApi";
import ChannelForm, { ChannelFormValues } from "./ChannelForm";

const initialValues: ChannelFormValues = {
  textId: "",
  name: "",
  description: "",
};

const AddChannelPage: React.FC = () => {
  const [createChannel, { data, isLoading, isError, error }] = useCreateChannelMutation();
  const [textIdError, setTextIdError] = useState<string | undefined>(undefined);

  return (
    <div>
      <ChannelForm
        mode="create"
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          try {
            if (textIdError === undefined) {
              await createChannel({
                createChannelRequestDto: {
                  textId: values.textId,
                  name: values.name,
                  description: values.description ?? null,
                },
              }).unwrap();
              resetForm();
            }
          } catch (e) {}
        }}
        textIdError={textIdError}
        setTextIdError={setTextIdError}
      />
    </div>
  );
};

export default AddChannelPage;
