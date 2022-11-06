import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteChannelMutation, useGetChannelByTextIdQuery, useUpdateChannelMutation } from "../../app/enhancedApi";
import ChannelForm, { FormValues } from "./ChannelForm";
import Button from "../uilib/Button";
import Container from "../uilib/Container";
import Dialog from "../uilib/dialog/Dialog";

export default function EditChannelPage() {
  const { textId } = useParams();
  const navigate = useNavigate();
  const { data, isFetching, isError: channelError, refetch } = useGetChannelByTextIdQuery({ textId: textId! });
  const [updateChannel, { data: updatedChannelData, isSuccess, isError, isLoading }] = useUpdateChannelMutation();
  const [deleteChannel, { isSuccess: deleteSuccess, isError: deleteError, isLoading: deleteLoading }] =
    useDeleteChannelMutation();
  const [textIdError, setTextIdError] = useState<string | undefined>(undefined);
  const [isDeleting, setIsDeleting] = useState(false);

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

  useEffect(() => {
    if (deleteSuccess) {
      navigate("/");
    }
  }, [deleteSuccess]);

  const initialValues: FormValues = {
    name: data?.name ?? "",
    textId: data?.textId ?? "",
    description: data?.description ?? "",
  };

  return (
    <>
      <div className="flex flex-col justify-start items-end gap-2">
        <ChannelForm
          mode="update"
          initialValues={initialValues}
          onSubmit={async (values) => {
            updateChannel({
              updateChannelRequestDto: {
                name: values.name,
                textId: values.textId,
                description: values.description,
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
        <Container
          title="Delete Channel"
          danger
          className="w-full"
          actions={[
            <Button key="delete-channel" variant="danger" disabled={isLoading} onClick={() => setIsDeleting(true)}>
              Delete Channel
            </Button>,
          ]}
        >
          <ul>
            <ul className="list-disc">
              <li className="ml-4">Deleting a channel will remove all posts and comments.</li>
              <li className="ml-4">All users' subscriptions to this channel will be removed.</li>
            </ul>
          </ul>
        </Container>
      </div>
      {data && (
        <Dialog
          show={isDeleting}
          danger
          onConfirm={() => deleteChannel({ uuid: data.uuid })}
          onCancel={() => setIsDeleting(false)}
          confirmText="I understand, delete"
          cancelText="No, keep the channel"
          title="Delete Channel"
          body="This action cannot be undone. Do you wish to delete your channel?"
          loading={deleteLoading}
          error={deleteError ? "Error deleting the channel. Please try again." : undefined}
        />
      )}
    </>
  );
}
