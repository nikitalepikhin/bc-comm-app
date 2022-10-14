import React, { useState } from "react";
import { useCreateChannelMutation } from "../../app/enhancedApi";
import ChannelForm, { FormValues } from "./ChannelForm";
import PageWrapper from "../../common/uilib/PageWrapper";

const initialValues: FormValues = {
  textId: "",
  name: "",
  description: "",
};

const AddChannelPage: React.FC = () => {
  const [createChannel, { data, isLoading, isError, error }] = useCreateChannelMutation();
  const [textIdError, setTextIdError] = useState<string | undefined>(undefined);

  return (
    <PageWrapper className="flex flex-col justify-start items-center w-full">
      <div className="max-w-screen-md w-full">
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
    </PageWrapper>
  );
};

export default AddChannelPage;
