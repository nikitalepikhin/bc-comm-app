import React from 'react';
import { Form, Formik, Field } from 'formik';
import { useLogInUserMutation } from '../app/api';
import * as yup from 'yup';
import classNames from 'classnames';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Invalid format')
    .required('Required'),
  password: yup.string().required('Required'),
});

const LoginPage: React.FC = () => {
  const [logInUser, { data, error, isLoading }] = useLogInUserMutation();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-8 px-6 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold text-center">Welcome back!</h2>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={({ email, password }) => {
          logInUser({ logInUserRequestDto: { email, password } });
        }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        validateOnMount={true}
      >
        {({ isValid, dirty }) => (
          <div className="mt-6 w-full md:max-w-md ">
            <div className="bg-white py-8 px-6 shadow rounded-lg">
              <Form>
                <div className="relative">
                  <Field
                    id={'email'}
                    name={'email'}
                    type={'text'}
                    placeholder={'Email'}
                    className={classNames(
                      'peer h-12 w-full rounded-md border-gray-400 bg-white px-3 focus:border-blue-600 focus:ring-blue-600 placeholder-transparent hover:border-gray-600'
                    )}
                  />
                  <label
                    htmlFor="email"
                    className={classNames(
                      'absolute bg-white px-0.5 left-3 -top-2.5 text-sm font-light text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:px-0.5 transition-all peer-focus:left-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:font-light peer-focus:px-0.5 peer-hover:text-gray-600 hover:cursor-text'
                    )}
                  >
                    Email
                  </label>
                </div>
                <div className="relative mt-4">
                  <Field
                    id={'password'}
                    name={'password'}
                    type={'password'}
                    placeholder={'Password'}
                    className={classNames(
                      'peer h-12 w-full rounded-md border-gray-400 bg-white px-3 focus:border-blue-600 focus:ring-blue-600 placeholder-transparent hover:border-gray-600'
                    )}
                  />
                  <label
                    htmlFor="password"
                    className={classNames(
                      'absolute bg-white px-0.5 left-3 -top-2.5 text-sm font-light text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:px-0.5 transition-all peer-focus:left-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:font-light peer-focus:px-0.5 peer-hover:text-gray-600 hover:cursor-text'
                    )}
                  >
                    Password
                  </label>
                  <p className="flex justify-end">
                    <a href="#" className="text-blue-600 hover:underline hover:text-blue-900 text-sm mr-2 mt-0.5">
                      Forgot your password?
                    </a>
                  </p>
                </div>
                <div className="flex justify-center mt-3">
                  <button
                    type="submit"
                    onClick={() => console.log(isValid && dirty)}
                    className="h-10 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 text-white hover:bg-blue-900 transition-all drop-shadow-md disabled:text-gray-900 disabled:bg-gray-400 hover-disabled:text-gray-900 hover-disabled:bg-gray-400"
                    disabled={!isValid || !dirty}
                  >
                    Log In
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
      <div className="mt-6">
        <p>
          Don't have an account?
          <a href="#" className="text-blue-600 hover:underline hover:text-blue-900 pl-2">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
