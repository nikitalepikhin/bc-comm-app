import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetChannelByTextIdQuery, useUpdateChannelMutation } from "../../app/enhancedApi";
import ChannelForm, { FormValues } from "./ChannelForm";

export default function EditChannelPage() {
  const { textId } = useParams();
  const navigate = useNavigate();
  const { data, isFetching, isError: channelError, refetch } = useGetChannelByTextIdQuery({ textId: textId! });
  const [updateChannel, { data: updatedChannelData, isSuccess, isError, isLoading }] = useUpdateChannelMutation();
  const [textIdError, setTextIdError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isFetching && data && !data.isOwner) {
      navigate(`/channels/${textId}`, { replace: true });
    }
  }, [isFetching, data]);

  useEffect(() => {
    if (isSuccess && updatedChannelData) {
      navigate(`/channels/${updatedChannelData.textId}`);
    }
  }, [isSuccess]);

  const initialValues: FormValues = {
    name: data?.name ?? "",
    textId: data?.textId ?? "",
    description: data?.description ?? "",
  };

  return (
    <ChannelForm
      mode="update"
      initialValues={initialValues}
      onSubmit={async (values) => {
        updateChannel({
          updateChannelRequestDto: {
            name: values.name,
            textId: values.textId,
            description: values.description ?? null,
            uuid: data?.uuid!,
            oldTextId: initialValues.textId,
          },
        });
      }}
      textIdError={textIdError}
      setTextIdError={setTextIdError}
      isError={isError}
      isLoading={isLoading}
      getChannel={() => refetch()}
      channelError={channelError}
    />
  );
}
