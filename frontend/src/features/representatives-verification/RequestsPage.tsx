import React, { Fragment } from "react";
import VerificationRequest from "./VerificationRequest";
import {
  useGetRepresentativeVerificationRequestsQuery,
  useGetTeacherVerificationRequestsQuery,
} from "../../app/enhancedApi";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { useAppSelector } from "../../app/hooks";
import { skipToken } from "@reduxjs/toolkit/query";
import Button from "../../common/uilib/Button";

const RequestsPage: React.FC = () => {
  const {
    user: { role },
  } = useAppSelector((state) => state.auth);

  const {
    data: representativeRequests,
    isFetching: getRepresentativeRequestsIsFetching,
    refetch: getRepresentativeRequestsRefetch,
  } = useGetRepresentativeVerificationRequestsQuery(role !== "ADMIN" ? skipToken : undefined);

  const {
    data: teacherRequests,
    isFetching: getTeacherRequestsIsFetching,
    refetch: getTeacherRequestsRefetch,
  } = useGetTeacherVerificationRequestsQuery();

  return (
    <div>
      <Tab.Group>
        <Tab.List as={Fragment}>
          {() => (
            <div
              className={classNames(
                "flex flex-row flex-wrap gap-1 my-2 justify-center items-center mx-auto bg-white p-2 shadow rounded-md w-fit",
                { hidden: role !== "ADMIN" }
              )}
            >
              {role === "ADMIN" && (
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <div
                      className={classNames(
                        "w-fit md:w-48 text-sm sm:text-base text-center px-8 py-2 border-2 rounded-md hover:bg-gray hover:cursor-pointer transition-all outline-none",
                        { "border-accent": selected },
                        { "border-transparent": !selected }
                      )}
                    >
                      Representatives
                    </div>
                  )}
                </Tab>
              )}
              <Tab as={Fragment}>
                {({ selected }) => (
                  <div
                    className={classNames(
                      "w-fit md:w-48 text-sm sm:text-base text-center px-8 py-2 border-2 rounded-md hover:bg-gray hover:cursor-pointer transition-all outline-none",
                      { "border-accent": selected },
                      { "border-transparent": !selected }
                    )}
                  >
                    Teachers
                  </div>
                )}
              </Tab>
            </div>
          )}
        </Tab.List>
        <Tab.Panels>
          {role === "ADMIN" && (
            <Tab.Panel className="flex flex-col justify-start items-center gap-2">
              {representativeRequests !== undefined && (
                <Button
                  loading={getRepresentativeRequestsIsFetching}
                  disabled={getRepresentativeRequestsIsFetching}
                  onClick={() => getRepresentativeRequestsRefetch()}
                >
                  Refresh requests list
                </Button>
              )}
              {representativeRequests?.requests.length === 0 && <p>No pending requests found.</p>}
              {representativeRequests &&
                representativeRequests.requests.length > 0 &&
                representativeRequests.requests.map((request) =>
                  request ? (
                    <VerificationRequest type="representative" key={request.user.uuid} request={request} />
                  ) : null
                )}
            </Tab.Panel>
          )}

          <Tab.Panel className="flex flex-col justify-start items-center gap-2">
            {teacherRequests !== undefined && (
              <Button
                loading={getTeacherRequestsIsFetching}
                disabled={getTeacherRequestsIsFetching}
                onClick={() => getTeacherRequestsRefetch()}
              >
                Refresh requests list
              </Button>
            )}
            {teacherRequests?.requests.length === 0 && <p>No pending requests found.</p>}
            {teacherRequests &&
              teacherRequests.requests.length > 0 &&
              teacherRequests.requests.map((request) =>
                request ? <VerificationRequest type="teacher" key={request.user.uuid} request={request} /> : null
              )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default RequestsPage;
