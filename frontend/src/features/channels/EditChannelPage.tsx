import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetChannelByTextIdQuery, useUpdateChannelMutation } from "../../app/enhancedApi";
import ChannelForm, { ChannelFormValues } from "./ChannelForm";
import PageWrapper from "../../common/ui/PageWrapper";

const EditChannelPage: React.FC = () => {
  const { textId } = useParams();
  const navigate = useNavigate();
  const { data, isFetching } = useGetChannelByTextIdQuery({ textId: textId! });
  const [updateChannel, { data: updatedChannelData, isSuccess }] = useUpdateChannelMutation();
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

  const initialValues: ChannelFormValues = {
    name: data?.name ?? "",
    textId: data?.textId ?? "",
    description: data?.description ?? "",
  };

  return (
    <PageWrapper>
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
      />
    </PageWrapper>
  );
};

export default EditChannelPage;
