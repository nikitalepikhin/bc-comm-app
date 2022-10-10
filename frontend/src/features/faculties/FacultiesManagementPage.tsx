import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { enhancedApi, useGetAllFacultiesQuery, useGetSchoolByUuidQuery } from "../../app/enhancedApi";
import { GetFacultiesResponseDto } from "../../app/api";
import { Field, FieldProps, Form, Formik } from "formik";
import { Link, useParams } from "react-router-dom";
import FacultiesTable from "./FacultiesTable";
import LinkWithIcon from "../../common/uilib/LinkWithIcon";

interface FacultiesPagingFormValues {
  page: string;
  count: string;
}

const countOptions = ["10", "20", "30"];

const initialValues: FacultiesPagingFormValues = {
  page: "1",
  count: countOptions[0],
};

const FacultiesManagementPage: React.FC = () => {
  const dispatch = useDispatch();
  const { schoolUuid } = useParams();
  console.log(schoolUuid);
  const { data: queryData, isFetching } = useGetAllFacultiesQuery({
    ...initialValues,
    schoolUuid: schoolUuid!,
  });
  const [data, setData] = useState<GetFacultiesResponseDto | undefined>(undefined);

  const { data: schoolData } = useGetSchoolByUuidQuery({ uuid: schoolUuid! });
  const [schoolName, setSchoolName] = useState<string | undefined>(undefined);

  const handleRefetch = useCallback(
    async ({ page, count }: FacultiesPagingFormValues) => {
      const result = await dispatch(
        enhancedApi.endpoints.getAllFaculties.initiate({ page, count, schoolUuid: schoolUuid! }, { forceRefetch: true })
      );
      // @ts-ignore
      setData(result.data);
    },
    [dispatch]
  );

  useEffect(() => {
    setData(queryData);
  }, [queryData]);

  useEffect(() => {
    if (schoolData?.name) {
      setSchoolName(schoolData.name);
    }
  }, [schoolData]);

  return (
    <div className="flex flex-col gap-2 justify-center">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          handleRefetch(values);
        }}
      >
        {({ submitForm, setFieldValue, values, handleReset }) => {
          return (
            <div className="flex flex-col justify-start gap-2">
              <div className="flex flex-row justify-between gap-2 items-center">
                <LinkWithIcon
                  to="/schools"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                >
                  Back to the schools table
                </LinkWithIcon>
                {schoolName !== undefined && (
                  <div>
                    Showing faculties for: <span className="font-bold">{schoolName}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-row justify-between items-center flex-wrap w-full">
                <Form className="flex flex-row items-center flex-wrap gap-2">
                  {data?.pages !== undefined && data?.pages > 1 && (
                    <div className="flex flex-row justify-center items-center py-1">
                      <label htmlFor="page-select">Page:</label>
                      <Field name="page" id="page-select">
                        {({ field }: FieldProps) => (
                          <select
                            {...field}
                            className="py-0.5 border border-gray-500 rounded-md ml-2"
                            onChange={(e) => {
                              field.onChange(e);
                              submitForm();
                            }}
                          >
                            {(() => {
                              const options = [];
                              if (data?.pages !== undefined) {
                                for (let i = 1; i <= data.pages; i++) {
                                  options.push(
                                    <option key={i} value={i}>
                                      {i} of {data?.pages}
                                    </option>
                                  );
                                }
                              }
                              return options;
                            })()}
                          </select>
                        )}
                      </Field>
                    </div>
                  )}
                  <div className="flex flex-row justify-center items-center py-1">
                    <label htmlFor="count-select">Items shown:</label>
                    <Field name="count" id="count-select">
                      {({ field }: FieldProps) => (
                        <select
                          {...field}
                          className="py-0.5 border border-gray-500 rounded-md ml-2"
                          onChange={(e) => {
                            field.onChange(e);
                            setFieldValue("page", "1");
                            submitForm();
                          }}
                        >
                          {countOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                  </div>
                  <button
                    type="reset"
                    onClick={(e) => {
                      handleReset(e);
                      submitForm();
                    }}
                    className="bg-blue-600 hover:bg-blue-800 text-white px-5 py-1 rounded-md h-full"
                  >
                    Reset
                  </button>
                </Form>
                <div>
                  <Link
                    to={`/faculties/${schoolUuid}/new`}
                    className="text-blue-600 hover:text-blue-800 hover:underline rounded-md px-5 py-1 h-full hover:cursor-pointer"
                  >
                    Add New Faculty
                  </Link>
                </div>
              </div>
              <FacultiesTable data={data?.faculties ?? []} loading={isFetching} />
              {data?.pages !== undefined && data?.faculties && data?.pages > 1 && (
                <div className="flex flex-row justify-center w-full gap-2">
                  <button
                    className="text-white bg-blue-600 hover:bg-blue-800 px-3 py-1 rounded-md disabled:bg-gray-500 disabled:hover:bg-gray-500"
                    onClick={() => {
                      setFieldValue("page", (parseInt(values.page) - 1).toString());
                      submitForm();
                    }}
                    disabled={values.page === "1"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="text-white bg-blue-600 hover:bg-blue-800 px-3 py-1 rounded-md disabled:bg-gray-500 disabled:hover:bg-gray-500"
                    onClick={() => {
                      setFieldValue("page", (parseInt(values.page) + 1).toString());
                      submitForm();
                    }}
                    disabled={values.page === data?.pages.toString()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default FacultiesManagementPage;
