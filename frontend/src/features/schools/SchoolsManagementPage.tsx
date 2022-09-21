import React, { useCallback, useEffect, useState } from "react";
import SchoolsTable from "./SchoolsTable";
import { Field, FieldProps, Form, Formik } from "formik";
import { enhancedApi, useGetAllSchoolsQuery } from "../../app/enhancedApi";
import { useDispatch } from "react-redux";
import { GetSchoolsResponseDto } from "../../app/api";
import { Link } from "react-router-dom";
import Button from "../../common/ui/Button";

interface SchoolsPagingFormValues {
  page: string;
  count: string;
}

const countOptions = ["10", "20", "30"];

const initialValues: SchoolsPagingFormValues = {
  page: "1",
  count: countOptions[0],
};

const SchoolsManagementPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data: queryData, isFetching } = useGetAllSchoolsQuery(initialValues);
  const [data, setData] = useState<GetSchoolsResponseDto | undefined>(undefined);

  const handleRefetch = useCallback(
    async ({ page, count }: SchoolsPagingFormValues) => {
      const result = await dispatch(
        enhancedApi.endpoints.getAllSchools.initiate({ page, count }, { forceRefetch: true })
      );
      // @ts-ignore
      setData(result.data);
    },
    [dispatch]
  );

  useEffect(() => {
    setData(queryData);
  }, [queryData]);

  return (
    <div className="flex flex-col gap-2 justify-center">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleRefetch(values);
        }}
      >
        {({ submitForm, setFieldValue, values, handleReset }) => {
          return (
            <>
              <div className="flex flex-row justify-between items-center flex-wrap w-full">
                <Form className="flex flex-row items-center flex-wrap gap-2">
                  {data?.pages && data?.pages > 1 && (
                    <div className="flex flex-row justify-center items-center py-1">
                      <label htmlFor="page-select">Page:</label>
                      <Field name="page" id="page-select">
                        {({ field }: FieldProps) => (
                          <select
                            className="py-0.5 border border-gray-500 rounded-md ml-2"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              submitForm();
                            }}
                          >
                            {(() => {
                              const options = [];
                              if (data?.pages) {
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
                          className="py-0.5 border border-gray-500 rounded-md ml-2"
                          {...field}
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
                  <Button
                    type="reset"
                    onClick={(e) => {
                      handleReset(e);
                      submitForm();
                    }}
                    variant="outlined"
                    className="px-5 py-0.5"
                  >
                    Reset
                  </Button>
                </Form>
                <div>
                  <Link
                    to="/schools/new"
                    className="text-accent hover:tebg-accent-strong hover:underline rounded-md px-5 py-1 h-full hover:cursor-pointer"
                  >
                    Add New School
                  </Link>
                </div>
              </div>
              <SchoolsTable data={data?.schools ?? []} loading={isFetching} />
              {data?.pages && data?.schools && data?.pages > 1 && (
                <div className="flex flex-row gap-2">
                  <button
                    className="text-white bg-accent hover:bg-accent-strong px-3 py-1 rounded-md disabled:bg-gray-500 disabled:hover:bg-gray-500"
                    onClick={() => {
                      setFieldValue("page", (parseInt(values.page) - 1).toString());
                      submitForm();
                    }}
                    disabled={values.page === "1"}
                  >
                    Prev
                  </button>
                  <button
                    className="text-white bg-accent hover:bg-accent-strong px-3 py-1 rounded-md disabled:bg-gray-500 disabled:hover:bg-gray-500"
                    onClick={() => {
                      setFieldValue("page", (parseInt(values.page) + 1).toString());
                      submitForm();
                    }}
                    disabled={values.page === data?.pages.toString()}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default SchoolsManagementPage;
