import React from "react";
import * as yup from "yup";

export interface ComboBoxInputType {
  value: string;
  uuid: string;
}

export interface FormValuesType {
  type: "student" | "teacher" | "representative";
  email: string;
  password: string;
  name: string;
  school: ComboBoxInputType;
  department: ComboBoxInputType;
}

const initialValues: FormValuesType = {
  type: "student",
  name: "",
  email: "",
  password: "",
  school: {
    value: "",
    uuid: "",
  },
  department: {
    value: "",
    uuid: "",
  },
};

const validationSchema = yup.object({
  type: yup.string().required(),
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Invalid format")
    .required("Required"),
  password: yup.string().required("Required"),
  name: yup.string().when("type", {
    is: "teacher",
    then: (schema) => schema.required("Required"),
    otherwise: (schema) => schema.nullable(),
  }),
  school: yup.object().when("type", {
    is: (type: string) => type === "teacher" || type === "representative",
    then: (schema) =>
      schema.shape({
        value: yup.string().required("Required"),
        uuid: yup.string().required("Invalid option selected"),
      }),
    otherwise: (schema) =>
      schema.shape({
        value: yup.string().nullable(),
        uuid: yup.string().nullable(),
      }),
  }),
});

const mapTypes = (index: number) => ["student", "teacher", "representative"][index];

const SignupPage: React.FC = () => {
  return (
    <div>signup</div>
    // <div className="min-h-screen flex flex-col justify-center items-center py-8 px-6 sm:px-8">
    //   <div className="flex flex-col justify-start items-center min-h-[60vh] w-full">
    //     <div>
    //       <h2 className="text-2xl font-bold text-center">Create an account</h2>
    //     </div>
    //     <div className="mt-6 w-full md:max-w-lg">
    //       <div className="bg-white py-8 px-6 shadow rounded-lg">
    //         <Formik
    //           initialValues={initialValues}
    //           validationSchema={validationSchema}
    //           validateOnMount={true}
    //           validateOnChange={true}
    //           validateOnBlur={true}
    //           onSubmit={(values) => {
    //             console.log("submitting", values);
    //           }}
    //         >
    //           {({ isValid, dirty, errors, touched, values }) => {
    //             console.log(errors);
    //             console.log(errors.school === undefined);
    //             return (
    //               <Form>
    //                 <Field name="type">
    //                   {({ form: { setFieldValue } }: FieldProps) => (
    //                     <Tab.Group onChange={(index) => setFieldValue("type", mapTypes(index))}>
    //                       <Tab.List className="grid grid-cols-2 xs:grid-cols-3 items-center bg-gray-100 rounded-md shadow transition-all">
    //                         <Tab as={React.Fragment}>
    //                           {({ selected }) => (
    //                             <button
    //                               className={classNames(
    //                                 "rounded py-2 px-1 xs:py-2 mx-1 my-1",
    //                                 {
    //                                   "ring-2 ring-blue-600 ring-offset-2 bg-blue-600 text-white hover:bg-blue-600":
    //                                     selected,
    //                                 },
    //                                 { "hover:bg-gray-300": !selected }
    //                               )}
    //                             >
    //                               <p className="truncate">Student</p>
    //                             </button>
    //                           )}
    //                         </Tab>
    //                         <Tab as={React.Fragment}>
    //                           {({ selected }) => (
    //                             <button
    //                               className={classNames(
    //                                 "rounded py-2 px-1 xs:py-2 mx-1 my-1",
    //                                 {
    //                                   "ring-2 ring-blue-600 ring-offset-2 bg-blue-600 text-white hover:bg-blue-600":
    //                                     selected,
    //                                 },
    //                                 { "hover:bg-gray-300": !selected }
    //                               )}
    //                             >
    //                               <p className="truncate">Teacher</p>
    //                             </button>
    //                           )}
    //                         </Tab>
    //                         <Tab as={React.Fragment}>
    //                           {({ selected }) => (
    //                             <button
    //                               className={classNames(
    //                                 "rounded py-2 px-1 xs:py-2 mx-1 my-1 col-span-2 xs:col-span-1",
    //                                 {
    //                                   "ring-2 ring-blue-600 ring-offset-2 bg-blue-600 text-white hover:bg-blue-600":
    //                                     selected,
    //                                 },
    //                                 { "hover:bg-gray-300": !selected }
    //                               )}
    //                             >
    //                               <p className="truncate">Representative</p>
    //                             </button>
    //                           )}
    //                         </Tab>
    //                       </Tab.List>
    //                       <Tab.Panels className={classNames("mt-6")}>
    //                         <Tab.Panel>
    //                           <Field name={"email"}>
    //                             {({ field }: FieldProps) => (
    //                               <TextField
    //                                 id={"email"}
    //                                 type={"text"}
    //                                 placeholder={"Email"}
    //                                 label={"Email"}
    //                                 errors={errors.email}
    //                                 touched={touched.email}
    //                                 field={field}
    //                               />
    //                             )}
    //                           </Field>
    //                           <Field name={"password"}>
    //                             {({ field }: FieldProps) => (
    //                               <TextField
    //                                 id={"password"}
    //                                 type={"password"}
    //                                 placeholder={"Password"}
    //                                 label={"Password"}
    //                                 errors={errors.password}
    //                                 touched={touched.password}
    //                                 wrapperClasses={"mt-4"}
    //                                 field={field}
    //                               />
    //                             )}
    //                           </Field>
    //                         </Tab.Panel>
    //                         <Tab.Panel>
    //                           <Field name={"email"}>
    //                             {({ field }: FieldProps) => (
    //                               <TextField
    //                                 id={"email"}
    //                                 type={"text"}
    //                                 placeholder={"Email"}
    //                                 label={"Email"}
    //                                 errors={errors.email}
    //                                 touched={touched.email}
    //                                 field={field}
    //                               />
    //                             )}
    //                           </Field>
    //                           <Field name={"password"}>
    //                             {({ field }: FieldProps) => (
    //                               <TextField
    //                                 id={"password"}
    //                                 type={"password"}
    //                                 placeholder={"Password"}
    //                                 label={"Password"}
    //                                 errors={errors.password}
    //                                 touched={touched.password}
    //                                 wrapperClasses={"mt-4"}
    //                                 field={field}
    //                               />
    //                             )}
    //                           </Field>
    //                           <Field name="school.value">
    //                             {({ field, form: { setFieldValue } }: FieldProps) => (
    //                               <ComboBox<ComboBoxInputType, SchoolDto>
    //                                 dataOptionName={"schools"}
    //                                 field={field}
    //                                 errors={errors.school}
    //                                 touched={touched.school}
    //                                 getDefaultValue={() => ({ value: "", uuid: "" })}
    //                                 mapDataToMatchingOptions={(school: SchoolDto) => ({
    //                                   value: school.value,
    //                                   uuid: school.uuid,
    //                                 })}
    //                                 setFieldValue={(value) => setFieldValue("school", value)}
    //                                 useGetDataQuery={useGetAllMatchingSchoolsQuery}
    //                                 id={"school"}
    //                                 placeholder={"School"}
    //                                 label={"School"}
    //                                 wrapperClasses={"mt-4"}
    //                               />
    //                             )}
    //                           </Field>
    //                           <Field name="department.value">
    //                             {({ field, form: { setFieldValue, values } }: FieldProps) => (
    //                               <ComboBox<ComboBoxInputType, DepartmentDto>
    //                                 dataOptionName={"departments"}
    //                                 field={field}
    //                                 errors={errors.department}
    //                                 touched={touched.department}
    //                                 getDefaultValue={() => ({ value: "", uuid: "" })}
    //                                 mapDataToMatchingOptions={(department: DepartmentDto) => ({
    //                                   value: department.value,
    //                                   uuid: department.uuid,
    //                                 })}
    //                                 setFieldValue={(value) => setFieldValue("department", value)}
    //                                 useGetDataQuery={useGetAllMatchingDepartmentsQuery}
    //                                 queryParams={{
    //                                   school: values.school.uuid !== "" ? values.school.uuid : "nouuid",
    //                                 }}
    //                                 id={"department"}
    //                                 placeholder={"Department"}
    //                                 label={"Department"}
    //                                 wrapperClasses={"mt-4"}
    //                                 disabled={errors.school !== undefined}
    //                               />
    //                             )}
    //                           </Field>
    //                         </Tab.Panel>
    //                         <Tab.Panel>
    //                           <Field name={"email"}>
    //                             {({ field }: FieldProps) => (
    //                               <TextField
    //                                 id={"email"}
    //                                 type={"text"}
    //                                 placeholder={"Email"}
    //                                 label={"Email"}
    //                                 errors={errors.email}
    //                                 touched={touched.email}
    //                                 field={field}
    //                               />
    //                             )}
    //                           </Field>
    //                           <Field name={"password"}>
    //                             {({ field }: FieldProps) => (
    //                               <TextField
    //                                 id={"password"}
    //                                 type={"password"}
    //                                 placeholder={"Password"}
    //                                 label={"Password"}
    //                                 errors={errors.password}
    //                                 touched={touched.password}
    //                                 wrapperClasses={"mt-4"}
    //                                 field={field}
    //                               />
    //                             )}
    //                           </Field>
    //                           <Field name="school.value">
    //                             {({ field, form: { setFieldValue } }: FieldProps) => (
    //                               <ComboBox<ComboBoxInputType, SchoolDto>
    //                                 dataOptionName={"schools"}
    //                                 field={field}
    //                                 errors={errors.school}
    //                                 touched={touched.school}
    //                                 getDefaultValue={() => ({ value: "", uuid: "" })}
    //                                 mapDataToMatchingOptions={(school: SchoolDto) => ({
    //                                   value: school.value,
    //                                   uuid: school.uuid,
    //                                 })}
    //                                 setFieldValue={(value) => setFieldValue("school", value)}
    //                                 useGetDataQuery={useGetAllMatchingSchoolsQuery}
    //                                 id={"school"}
    //                                 placeholder={"School"}
    //                                 label={"School"}
    //                                 wrapperClasses={"mt-4"}
    //                               />
    //                             )}
    //                           </Field>
    //                         </Tab.Panel>
    //                       </Tab.Panels>
    //                     </Tab.Group>
    //                   )}
    //                 </Field>
    //                 <div className="flex justify-center mt-4">
    //                   <button
    //                     type="submit"
    //                     className="h-10 w-full py-2 px-4 border border-transparent rounded text-base font-medium bg-blue-600 text-white hover:bg-blue-900 transition-all shadow disabled:text-gray-700 disabled:bg-gray-300"
    //                     disabled={!isValid || !dirty}
    //                   >
    //                     Sign Up
    //                   </button>
    //                 </div>
    //               </Form>
    //             );
    //           }}
    //         </Formik>
    //       </div>
    //     </div>
    //     <div className="mt-6">
    //       <p>
    //         Already registered?
    //         <a href="/login" className="text-blue-600 hover:underline hover:text-blue-900 pl-2">
    //           Log in
    //         </a>
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SignupPage;