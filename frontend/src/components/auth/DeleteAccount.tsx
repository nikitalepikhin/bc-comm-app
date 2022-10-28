import classNames from "classnames";
import Container from "../uilib/Container";
import Button from "../uilib/Button";
import { useState } from "react";
import Dialog from "../uilib/dialog/Dialog";
import { useDeleteAccountMutation } from "../../app/enhancedApi";

export default function DeleteAccount() {
  const [showDialog, setShowDialog] = useState(false);
  const [deleteAccount, { isLoading, isError }] = useDeleteAccountMutation();

  return (
    <Container title="Delete Account" danger className={classNames("w-full", "flex flex-col justify-start gap-2")}>
      <div className="flex flex-col justify-start items-end gap-2 w-full">
        <div className="w-full leading-loose">
          <span className="text-red-600 dark:text-red-500 font-bold">Deleting the account is irreversible.</span>
          <br />
          <span>If you only wish to change the username, you can do so in the section "Refresh Username".</span>
          <br />
          <span className="text-red-600 dark:text-red-500 font-bold">After you delete the account:</span>
          <ul className="list-disc">
            <li className="ml-4">All your created channels with all the content will be deleted.</li>
            <li className="ml-4">
              All your posts will be further anonymized. The author will be updated to "deleted".
            </li>
            <li className="ml-4">
              All your comments will be further anonymized. The author will be updated to "deleted".
            </li>
          </ul>
        </div>
        <Button variant="danger" type="button" onClick={() => setShowDialog(true)}>
          Delete Account
        </Button>
      </div>
      <Dialog
        danger
        title="Delete Account"
        body="Deleting your account cannot be undone. Are you sure you want to delete all your data?"
        show={showDialog}
        loading={isLoading}
        error={isError ? "Error deleting the account. Please try again." : undefined}
        onConfirm={() => deleteAccount()}
        onCancel={() => setShowDialog(false)}
        confirmText="Yes, delete the account"
        cancelText="Keep the account and return"
      />
    </Container>
  );
}
