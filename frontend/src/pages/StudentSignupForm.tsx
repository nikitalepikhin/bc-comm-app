import classNames from 'classnames';
import { Field, FormikErrors, FormikTouched } from 'formik';
import { FormValuesType } from './SignupPage';

interface StudentSignupFormPropsType {
  errors: FormikErrors<FormValuesType>;
  touched: FormikTouched<FormValuesType>;
}

const StudentSignupForm: React.FC<StudentSignupFormPropsType> = ({ errors, touched }) => {
  return (
    <>
      <div className="relative">
        <Field
          id={'email'}
          name={'email'}
          type={'text'}
          placeholder={'Email'}
          className={classNames(
            'peer h-12 w-full rounded-md bg-white px-3 focus:border-blue-600 focus:ring-blue-600 placeholder-transparent',
            { 'border-red-500 hover:border-red-500': errors.email !== undefined && touched.email },
            {
              'border-gray-400 hover:border-gray-600': !(errors.email !== undefined && touched.email),
            }
          )}
        />
        <label
          htmlFor="email"
          className={classNames(
            'absolute bg-white rounded px-0.5 left-3 -top-2.5 text-sm font-light  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:px-0.5 transition-all peer-focus:left-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:font-light peer-focus:px-0.5  hover:cursor-text',
            { 'text-red-500 hover:text-red-500': errors.email !== undefined && touched.email },
            {
              'text-gray-400 peer-hover:text-gray-600': !(errors.email !== undefined && touched.email),
            }
          )}
        >
          Email
        </label>
        {errors.email !== undefined && touched.email && <p className="text-sm text-red-500 ml-3">{errors.email}</p>}
      </div>
      <div className="relative mt-4">
        <Field
          id={'password'}
          name={'password'}
          type={'password'}
          placeholder={'Password'}
          className={classNames(
            'peer h-12 w-full rounded-md bg-white px-3 focus:border-blue-600 focus:ring-blue-600 placeholder-transparent',
            {
              'border-red-500 hover:border-red-500': errors.password !== undefined && touched.password,
            },
            {
              'border-gray-400 hover:border-gray-600': !(errors.password !== undefined && touched.password),
            }
          )}
        />
        <label
          htmlFor="password"
          className={classNames(
            'absolute bg-white rounded px-0.5 left-3 -top-2.5 text-sm font-light  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-placeholder-shown:px-0.5 transition-all peer-focus:left-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:font-light peer-focus:px-0.5  hover:cursor-text',
            { 'text-red-500 hover:text-red-500': errors.password !== undefined && touched.password },
            {
              'text-gray-400 peer-hover:text-gray-600': !(errors.password !== undefined && touched.password),
            }
          )}
        >
          Password
        </label>
        {errors.password !== undefined && touched.password && (
          <p className="text-sm text-red-500 ml-3">{errors.password}</p>
        )}
      </div>
    </>
  );
};

export default StudentSignupForm;
