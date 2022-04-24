import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';
import RepresentativeSignupForm from './RepresentativeSignupForm';
import StudentSignupForm from './StudentSignupForm';
import TeacherSignupForm from './TeacherSignupForm';
import * as yup from 'yup';
import { Field, FieldProps, Form, Formik } from 'formik';

export interface FormValuesType {
  type: 'student' | 'teacher' | 'representative';
  email: string;
  password: string;
  name: string;
}

const initialValues: FormValuesType = {
  type: 'student',
  name: '',
  email: '',
  password: '',
};

const validationSchema = yup.object({
  type: yup.string().required(),
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Invalid format')
    .required('Required'),
  password: yup.string().required('Required'),
  name: yup.string().when('type', {
    is: 'teacher',
    then: (schema) => schema.required('Required'),
    otherwise: (schema) => schema.nullable(),
  }),
});

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-8 px-6 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold text-center">Create an account</h2>
      </div>
      <div className="mt-6 w-full md:max-w-md ">
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log('submitting', values);
            }}
          >
            {({ isValid, dirty, errors, touched }) => (
              <Form>
                <Tab.Group>
                  <Field name="type">
                    {({ form: { setFieldValue } }: FieldProps) => (
                      <Tab.List className="grid grid-cols-3 items-center bg-gray-100 rounded shadow transition-all">
                        <Tab as={React.Fragment}>
                          {({ selected }) => (
                            <button
                              onClick={() => setFieldValue('type', 'student')}
                              className={classNames(
                                'rounded px-1 py-2 mr-1',
                                {
                                  'ring-2 ring-blue-600 ring-offset-2 bg-blue-600 text-white hover:bg-blue-600':
                                    selected,
                                },
                                { 'hover:bg-gray-300': !selected }
                              )}
                            >
                              Student
                            </button>
                          )}
                        </Tab>
                        <Tab as={React.Fragment}>
                          {({ selected }) => (
                            <button
                              onClick={() => setFieldValue('type', 'teacher')}
                              className={classNames(
                                'rounded px-1 py-2 mx-1',
                                {
                                  'ring-2 ring-blue-600 ring-offset-2 bg-blue-600 text-white hover:bg-blue-600':
                                    selected,
                                },
                                { 'hover:bg-gray-300': !selected }
                              )}
                            >
                              Teacher
                            </button>
                          )}
                        </Tab>
                        <Tab as={React.Fragment}>
                          {({ selected }) => (
                            <button
                              onClick={() => setFieldValue('type', 'representative')}
                              className={classNames(
                                'rounded px-1 py-2 ml-1',
                                {
                                  'ring-2 ring-blue-600 ring-offset-2 bg-blue-600 text-white hover:bg-blue-600':
                                    selected,
                                },
                                { 'hover:bg-gray-300': !selected }
                              )}
                            >
                              Representative
                            </button>
                          )}
                        </Tab>
                      </Tab.List>
                    )}
                  </Field>
                  <Tab.Panels className={classNames('mt-6')}>
                    <Tab.Panel>
                      <StudentSignupForm errors={errors} touched={touched} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <TeacherSignupForm />
                    </Tab.Panel>
                    <Tab.Panel>
                      <RepresentativeSignupForm />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>

                <div className="flex justify-center mt-3">
                  <button
                    type="submit"
                    className="h-10 w-full py-2 px-4 border border-transparent rounded text-base font-medium bg-blue-600 text-white hover:bg-blue-900 transition-all shadow disabled:text-gray-700 disabled:bg-gray-300"
                    disabled={!isValid || !dirty}
                  >
                    Sign Up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="mt-6">
        <p>
          Already registered?
          <a href="/login" className="text-blue-600 hover:underline hover:text-blue-900 pl-2">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
