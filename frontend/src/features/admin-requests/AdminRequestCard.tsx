import React, { useState } from "react";
import { Field, FieldProps, Form, Formik } from "formik";

const initialValues = {
  reason: "",
  approve: false,
};

const AdminRequestCard: React.FC = () => {
  const [showingReason, setShowingReason] = useState(false);
  return (
    <div className="flex flex-col justify-center items-start gap-2 bg-white rounded-md px-6 py-2 w-fit max-w-xl border border-gray-400">
      <p>Representative James Cowell has created their account to represent Czech Technical University in Prague</p>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          if (values.reason.length > 0) {
            values.approve = false;
          } else {
            values.approve = true;
          }
          console.log(values);
        }}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form className='className="flex flex-col justify-center items-start gap-2 w-full'>
            <div className="mb-1">
              {showingReason && (
                <Field name="reason">
                  {({ field }: FieldProps) => (
                    <textarea
                      className="rounded-md border-gray-400 hover:border-gray-600 focus:border-blue-600 focus:ring-blue-600 w-full resize-none h-20 max-h-fit"
                      id="rep-request-msg"
                      placeholder="Provide a reason for the decline here"
                      maxLength={300}
                      {...field}
                    />
                  )}
                </Field>
              )}
            </div>
            <div className="flex flex-row gap-2 justify-start items-center flex-wrap">
              <button
                className="px-4 py-1.5 text-white bg-green-600 hover:bg-green-800 rounded-md disabled:bg-gray-300 disabled:hover:bg-gray-300"
                disabled={values.reason.length > 0 || showingReason}
                type="submit"
              >
                Approve
              </button>
              <button
                className="px-4 py-1.5 text-white bg-red-600 hover:bg-red-800 rounded-md disabled:bg-gray-300 disabled:hover:bg-gray-300"
                disabled={values.reason.length === 0 && showingReason}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (showingReason) {
                    handleSubmit();
                  } else {
                    setShowingReason(true);
                  }
                }}
              >
                Decline
              </button>
              <button
                className="px-4 py-1.5 text-white bg-gray-500 hover:bg-gray-700 rounded-md disabled:bg-gray-300 disabled:hover:bg-gray-300"
                disabled={!showingReason}
                onClick={(e) => {
                  e.preventDefault();
                  setFieldValue("reason", "");
                  setShowingReason(false);
                }}
              >
                Cancel
              </button>
              {values.reason.length > 0 ? (
                <p className="ml-auto text-gray-600 text-sm pb-4">{values.reason.length}/300</p>
              ) : null}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminRequestCard;
