import React, { useState } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import { RepresentativeRequestDto } from "../../app/api";
import {
  useGetRepresentativeVerificationRequestsQuery,
  useVerifyRepresentativeUserMutation,
} from "../../app/enhancedApi";
import LoadingSpinner from "../../common/ui/LoadingSpinner";
import Button from "../../common/components/Button";

const initialValues = {
  reason: "",
  approve: false,
};

interface RepresentativeVerificationRequestPropsType {
  request: RepresentativeRequestDto;
}
const RepresentativeVerificationRequest: React.FC<RepresentativeVerificationRequestPropsType> = ({ request }) => {
  const userCreatedDate = new Date(Date.parse(request.user.created));
  const [showingReason, setShowingReason] = useState(false);
  const [verifyRepresentative, { isLoading, isSuccess }] = useVerifyRepresentativeUserMutation();
  const { isFetching } = useGetRepresentativeVerificationRequestsQuery();
  return (
    <div className="flex flex-col justify-center items-start gap-2 rounded-md overflow-hidden w-full md:max-w-2xl shadow bg-white">
      {isLoading && (
        <div className="m-4 flex justify-center items-center w-full">{<LoadingSpinner border="border-2" />}</div>
      )}
      {!isLoading && (
        <div className="px-4 pt-4">
          <div className="grid grid-cols-3">
            <div className="text-secondary">Name:</div>
            <div className="col-span-2">{`${request.user.name}`}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-secondary">Username:</div>
            <div className="col-span-2">{`${request.user.username}`}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-secondary">Email:</div>
            <div className="col-span-2">{`${request.user.email}`}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-secondary">Created:</div>
            <div className="col-span-2">{`${userCreatedDate.toLocaleString("cs-CZ")}`}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-secondary">School Name:</div>
            <div className="col-span-2">{`${request.school.name}`}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-secondary">School UUID:</div>
            <div className="col-span-2">{`${request.school.uuid}`}</div>
          </div>
        </div>
      )}
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
            <div className="mb-1 px-4">
              {showingReason && (
                <Field name="reason">
                  {({ field }: FieldProps) => (
                    <textarea
                      className="rounded-md border-secondary focus:border-accent focus:ring-accent w-full resize-none h-20 max-h-fit"
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
            <div className="flex flex-row gap-2 justify-start items-center flex-wrap bg-gray px-4 py-4">
              <Button
                variant="contained"
                disabled={values.reason.length > 0 || showingReason || isLoading || isSuccess || isFetching}
                type="submit"
              >
                Approve
              </Button>
              <Button
                disabled={(values.reason.length === 0 && showingReason) || isLoading || isSuccess || isFetching}
                type="submit"
                variant="outlined"
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
              </Button>
              {showingReason && (
                <Button
                  variant="standard"
                  disabled={!showingReason || isLoading || isSuccess || isFetching}
                  onClick={(e) => {
                    e.preventDefault();
                    setFieldValue("reason", "");
                    setShowingReason(false);
                  }}
                >
                  Cancel
                </Button>
              )}
              {values.reason.length > 0 ? (
                <p className="ml-auto text-secondary text-sm pb-4">{values.reason.length}/300</p>
              ) : null}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RepresentativeVerificationRequest;
