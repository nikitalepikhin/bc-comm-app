import classNames from "classnames";
import Container from "../../common/uilib/Container";
import Button from "../../common/uilib/Button";
import { useState } from "react";
import Dialog from "../../common/uilib/dialog/Dialog";

export default function DeleteAccount() {
  const [showDialog, setShowDialog] = useState(false);

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
        title="Delete Account"
        body="This is the final warning. Deleting your account cannot be undone. Please make sure you really want to delete all your data."
        show={showDialog}
        danger
        onConfirm={() => {
          // todo
        }}
        onCancel={() => setShowDialog(false)}
        confirmText="I understand, delete the account"
        cancelText="Keep the account and return"
      />
    </Container>
  );
}
