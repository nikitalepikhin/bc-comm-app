import classNames from "classnames";
import Badge from "../ui/Badge";
import Box from "../ui/Box";
import useTheme from "../hooks/useTheme";
import Button from "../ui/Button";
import Container from "../ui/Container";
import { useState } from "react";
import Dialog from "../ui/Dialog";
import PageWrapper from "../ui/PageWrapper";
import Alert from "../ui/Alert";

export default function UiSandbox() {
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-2 w-full">
        <Alert severity="error">An error has occurred.</Alert>
        <Alert severity="warning">Please select at least one value.</Alert>
        <Alert severity="info">Maximum two entries are allowed.</Alert>
        <Alert severity="success">You have successfully signed up!</Alert>

        <Container
          title="Container Title"
          actions={
            <>
              <Button loading>Cancel</Button>
              <Button variant="accent">Cancel</Button>
              <Button variant="standard">Cancel</Button>
              <Button variant="danger" onClick={() => setOpen(true)}>
                Confirm
              </Button>
            </>
          }
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, sapiente?
        </Container>
        <Box className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="flex flex-row gap-2 justify-start">
            <Button onClick={() => setTheme("light")}>Light</Button>
            <Button onClick={() => setTheme("dark")}>Dark</Button>
            <Button onClick={() => setTheme("system")}>System</Button>
          </div>

          <Badge>edited</Badge>

          <button
            className={classNames(
              "text-sm text-slate-900 dark:text-white",
              "bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800",
              "border border-slate-200 dark:border-slate-700",
              "rounded-md",
              "py-2 px-3",
              "focus:ring-2 focus:ring-blue-600/50 focus:ring-offset-1 dark:focus:ring-offset-slate-800 focus:outline-none",
              "w-fit"
            )}
          >
            Util button
          </button>

          <h1 className="text-lg">Some text</h1>
          <p className="text-secondary dark:text-gray-400">Some more text</p>

          <button
            className={classNames(
              "text-sm text-white",
              "bg-red-600 hover:bg-red-700",
              "border border-slate-200 dark:border-slate-700",
              "rounded-md",
              "py-2 px-3",
              "focus:ring-2 focus:ring-red-600/50 focus:ring-offset-1 dark:focus:ring-offset-slate-800 focus:outline-none",
              "w-fit"
            )}
          >
            Danger button
          </button>

          <button
            className={classNames(
              "text-sm text-white",
              "bg-amber-600 hover:bg-amber-700",
              "border border-slate-200 dark:border-slate-700",
              "rounded-md",
              "py-2 px-3",
              "focus:ring-2 focus:ring-amber-600/50 focus:ring-offset-1 dark:focus:ring-offset-slate-800 focus:outline-none",
              "w-fit"
            )}
          >
            Accent button
          </button>

          <button
            className={classNames(
              "text-sm text-slate-900 hover:text-slate-700 dark:text-white dark:hover:text-slate-300",
              "py-2 px-3",
              "focus:outline-none",
              "w-fit"
            )}
          >
            Standard button
          </button>
        </Box>

        <Dialog
          show={open}
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          title="Dialog Title"
          body="Are you sure you want to do this?"
        />

        <Box>hello world</Box>
      </div>
    </PageWrapper>
  );
}
