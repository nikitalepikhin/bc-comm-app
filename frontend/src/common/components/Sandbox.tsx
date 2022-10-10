import classNames from "classnames";
import Badge from "../uilib/Badge";
import Box from "../uilib/Box";
import useTheme from "../hooks/useTheme";
import Button from "../uilib/Button";
import Container from "../uilib/Container";
import { useState } from "react";
import Dialog from "../uilib/Dialog";
import PageWrapper from "../uilib/PageWrapper";
import Alert from "../uilib/Alert";
import Input from "../uilib/Input";
import { Field, FieldProps, Form, Formik } from "formik";
import * as yup from "yup";
import Textarea from "../uilib/Textarea";
import Combobox from "../uilib/Combobox";
import StyledLink from "../uilib/StyledLink";
import LinkWithIcon from "../uilib/LinkWithIcon";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/20/solid";
import LoadingSpinner from "../uilib/LoadingSpinner";
import IconButton from "../uilib/IconButton";
import ChannelSearch from "../../features/channels/ChannelSearch";
import RadioGroup from "../uilib/RadioGroup";

const validationSchema = yup.object({
  age: yup.number().min(40, "Minimum age is 40.").required("This field is required."),
  description: yup.string().required("This field is required."),
});

export default function Sandbox() {
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-2 w-full">
        <Box>
          <ChannelSearch onSelected={() => {}} />
        </Box>

        <Box>
          <IconButton onClick={() => console.log("icon clicked")}>
            <XMarkIcon className="h-8 w-8" />
          </IconButton>
        </Box>

        <Box className="flex flex-row justify-start items-center gap-2">
          <Button onClick={() => setTheme("light")}>Light</Button>
          <Button onClick={() => setTheme("dark")}>Dark</Button>
          <Button onClick={() => setTheme("system")}>System</Button>
        </Box>

        <Box>
          <LoadingSpinner>Loading content</LoadingSpinner>
        </Box>

        <Box>
          <StyledLink to="/">Return to the home page</StyledLink>
          <LinkWithIcon to="/" icon={<ChevronLeftIcon className="h-5 w-5" />}>
            Return to the home page
          </LinkWithIcon>
          <LinkWithIcon to="/" icon={<ChevronRightIcon className="h-5 w-5" />} position="right">
            Proceed to the home page
          </LinkWithIcon>
        </Box>

        <Box>
          <Combobox
            loading={false}
            name="combo"
            labelValue="Lorem Ipsum"
            onChange={(value) => console.log(`value changed to ${value?.text} (${value?.value})`)}
            onInputChange={(value) => console.log(value)}
            options={["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipisicing", "elit"].map((item) => ({
              value: item.toLowerCase(),
              text: item.slice(0, 1).toUpperCase() + item.slice(1).toLowerCase(),
            }))}
          />
        </Box>

        <Formik
          initialValues={{ firstName: "", lastName: "", age: "", description: "", account: "teacher" }}
          onSubmit={() => {}}
          validationSchema={validationSchema}
          validateOnChange
          validateOnBlur
        >
          <Form className="w-full">
            <Box>
              <Field name="account">
                {({ field }: FieldProps) => (
                  <RadioGroup
                    {...field}
                    labelValue="Select type of account"
                    defaultValue={"student"}
                    options={[
                      { value: "teacher", label: "Teacher" },
                      { value: "student", label: "Student" },
                      { value: "representative", label: "Representative" },
                      { value: "admin", label: "Admin" },
                    ]}
                  />
                )}
              </Field>

              <Field name="firstName">
                {({ field }: FieldProps) => <Input disabled {...field} labelValue="First Name" placeholder="John" />}
              </Field>
              <Field name="lastName">
                {({ field }: FieldProps) => <Input {...field} labelValue="Last Name" placeholder="Doe" fullWidth />}
              </Field>
              <Field name="age">
                {({ field, meta }: FieldProps) => (
                  <Input
                    type="number"
                    {...field}
                    labelValue="Age"
                    placeholder="21"
                    fullWidth
                    error={meta.touched && meta.error ? meta.error : undefined}
                  />
                )}
              </Field>
              <Field name="description">
                {({ field, meta }: FieldProps) => (
                  <Textarea
                    {...field}
                    labelValue="Description"
                    placeholder="Enter a description here..."
                    error={meta.touched && meta.error ? meta.error : undefined}
                    showCharCount
                    fullWidth
                    maxLength={300}
                    disabled
                  />
                )}
              </Field>
            </Box>
          </Form>
        </Formik>

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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aspernatur fuga perferendis.
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
          danger
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          title="Delete Account"
          body={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid blanditiis ex magni unde veritatis? At consequatur dignissimos eius necessitatibus officia recusandae rerum."
          }
        />

        <Box>hello world</Box>
      </div>
    </PageWrapper>
  );
}
