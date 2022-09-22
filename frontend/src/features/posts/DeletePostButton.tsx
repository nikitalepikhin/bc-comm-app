import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDeletePostMutation } from "../../app/enhancedApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DeletePostButton() {
  const { textId, postUuid } = useParams() as { textId: string; postUuid: string };
  const [deletePost, { isSuccess }] = useDeletePostMutation();
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(`/channels/${textId}`);
    }
  }, [isSuccess]);

  return (
    <>
      <button
        type="button"
        className="text-red hover:text-red-strong transition-all flex gap-1 items-center"
        onClick={() => {
          if (deleteInProgress) {
            deletePost({ deletePostRequestDto: { postUuid } });
          } else {
            setDeleteInProgress(true);
          }
        }}
      >
        <TrashIcon className="h-4 w-4" />
        <span>{deleteInProgress ? "Confirm Delete" : "Delete"}</span>
      </button>
      {deleteInProgress && (
        <button
          type="button"
          className="text-secondary flex gap-1 items-center"
          onClick={() => setDeleteInProgress(false)}
        >
          <XMarkIcon className="h-4 w-4" />
          <span>Cancel</span>
        </button>
      )}
    </>
  );
}
