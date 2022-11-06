import { useState } from "react";
import { useCreateChannelMutation } from "../../app/enhancedApi";
import PageWrapper from "../uilib/PageWrapper";
import ChannelForm, { FormValues } from "./ChannelForm";
import { useNavigate } from "react-router-dom";

const initialValues: FormValues = {
  textId: "",
  name: "",
  description: "",
};

export default function AddChannelPage() {
  const [createChannel, { isLoading, isError }] = useCreateChannelMutation();
  const [textIdError, setTextIdError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

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
                navigate(`/channels/${values.textId}`);
              }
            } catch (e) {}
          }}
          textIdError={textIdError}
          setTextIdError={setTextIdError}
          isError={isError}
          isLoading={isLoading}
        />
      </div>
    </PageWrapper>
  );
}
