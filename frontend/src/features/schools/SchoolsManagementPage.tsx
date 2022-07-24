import React, { useEffect } from "react";
import useUserData from "../../common/hooks/useUserData";
import { Navigate } from "react-router-dom";
import { useLazyGetSchoolsQuery } from "../../app/enhancedApi";
import SchoolsTable from "./SchoolsTable";
import { Field, FieldProps, Form, Formik } from "formik";

interface SchoolsPagingFormValues {
  page: string;
  count: string;
}

const countOptions = ["5", "10", "20"];

const initialValues: SchoolsPagingFormValues = {
  page: "1",
  count: countOptions[0],
};

const SchoolsManagementPage: React.FC = () => {
  const { present, role } = useUserData();

  const [getSchools, { data, isFetching }] = useLazyGetSchoolsQuery();

  useEffect(() => {
    getSchools(initialValues);
  }, []);

  if (present && role === "ADMIN") {
    return (
      <>
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              await getSchools(values);
            }}
          >
            {({ submitForm, setFieldValue, values }) => {
              return (
                <>
                  <Form>
                    {data?.pages && data?.pages > 1 && (
                      <div>
                        <label htmlFor="page-select">Page:</label>
                        <Field name="page" id="page-select">
                          {({ field }: FieldProps) => (
                            <select
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
                                        {i}
                                      </option>
                                    );
                                  }
                                }
                                return options;
                              })()}
                            </select>
                          )}
                        </Field>
                        <span> / {data?.pages}</span>
                      </div>
                    )}
                    <div>
                      <label htmlFor="count-select">Items shown:</label>
                      <Field name="count" id="count-select">
                        {({ field }: FieldProps) => (
                          <select
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
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
                  </Form>
                  <SchoolsTable data={data?.schools ?? []} loading={isFetching} />
                  {data?.pages && data?.schools && data?.pages > 1 && (
                    <div className="flex flex-row gap-2">
                      <button
                        className="text-white bg-blue-600 hover:bg-blue-800 px-3 py-1 rounded-md disabled:bg-gray-500 disabled:hover:bg-gray-500"
                        onClick={() => {
                          setFieldValue("page", (parseInt(values.page) - 1).toString());
                          submitForm();
                        }}
                        disabled={values.page === "1"}
                      >
                        Prev
                      </button>
                      <button
                        className="text-white bg-blue-600 hover:bg-blue-800 px-3 py-1 rounded-md disabled:bg-gray-500 disabled:hover:bg-gray-500"
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
      </>
    );
  } else {
    return <Navigate to={"/"} replace />;
  }
};

export default SchoolsManagementPage;
