import React, { useState } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import { RepresentativeRequestDto } from "../../app/api";
import {
  useGetRepresentativeVerificationRequestsQuery,
  useVerifyRepresentativeUserMutation,
} from "../../app/enhancedApi";
import { CircularProgress } from "@mui/material";

const initialValues = {
  reason: "",
  approve: false,
};

interface AdminRequestCardPropsType {
  request: RepresentativeRequestDto;
}
const AdminRequestCard: React.FC<AdminRequestCardPropsType> = ({ request }) => {
  const userCreatedDate = new Date(Date.parse(request.user.created));
  const [showingReason, setShowingReason] = useState(false);
  const [verifyRepresentative, { isLoading, isSuccess }] = useVerifyRepresentativeUserMutation();
  const { isFetching } = useGetRepresentativeVerificationRequestsQuery();
  return (
    <div className="flex flex-col justify-center items-start gap-2 bg-white rounded-md px-6 py-2 w-full md:max-w-2xl border border-gray-400">
      {isLoading && <CircularProgress size={20} />}
      <div>
        <p>
          Representative: <span className="font-bold">{`${request.user.name}`}</span>
        </p>
        <div className="pl-4">
          <p>
            username: <span className="font-bold">{`${request.user.username}`}</span>
          </p>
          <p>
            email: <span className="font-bold">{`${request.user.email}`}</span>
          </p>
          <p>
            created: <span className="font-bold">{`${userCreatedDate.toLocaleString("cs-CZ")}`}</span>
          </p>
        </div>
      </div>
      <div>
        <p>
          School: <span className="font-bold">{`${request.school.name}`}</span>
        </p>
        <div className="pl-4">
          <p>
            uuid: <span className="font-bold">{`${request.school.uuid}`}</span>
          </p>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          if (values.reason.length > 0) {
            values.approve = false;
          } else {
            values.approve = true;
          }
          await verifyRepresentative({
            verifyRepresentativeUserRequestDto: {
              verifiedUserUuid: request.user.uuid,
              approve: values.approve,
              reason: values.reason,
            },
          });
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
                      disabled={isLoading || isSuccess}
                      {...field}
                    />
                  )}
                </Field>
              )}
            </div>
            <div className="flex flex-row gap-2 justify-start items-center flex-wrap">
              <button
                className="px-4 py-1.5 text-white bg-green-600 hover:bg-green-800 rounded-md disabled:bg-gray-300 disabled:hover:bg-gray-300"
                disabled={values.reason.length > 0 || showingReason || isLoading || isSuccess || isFetching}
                type="submit"
              >
                Approve
              </button>
              <button
                className="px-4 py-1.5 text-white bg-red-600 hover:bg-red-800 rounded-md disabled:bg-gray-300 disabled:hover:bg-gray-300"
                disabled={(values.reason.length === 0 && showingReason) || isLoading || isSuccess || isFetching}
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
                disabled={!showingReason || isLoading || isSuccess || isFetching}
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
