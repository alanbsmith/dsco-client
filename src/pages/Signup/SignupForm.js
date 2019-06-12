import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
// providers
import { useCurrentUser } from '../../providers/CurrentUser';
// components
import { ValidatedTextField } from '../../components/ValidatedTextField';
// elements
import { Button } from '../../elements/Button';
import { ButtonList } from '../../elements/ButtonList';
import { Box } from '../../elements/Box';
import { Form } from '../../elements/Form';

export function SignupForm() {
  const { currentUserService, currentUserLoading } = useCurrentUser();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const signupSchema = yup.object().shape({
    firstName: yup
      .string('First name is required')
      .required('First name is required'),
    lastName: yup
      .string()
      .required('Last name is required'),
    email: yup
      .string()
      .email('Must be a valid email address')
      .required('Email is required'),
    phone: yup
      .string().matches(phoneRegExp, 'Must be a valid phone number'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    passwordConfirm: yup
      .string()
      .when('password', (password, schema) => {
        return password
          && schema
            .required('Password confirmation is required')
            .oneOf([yup.ref('password')], 'Passwords do not match')
      }),
  });


  function handleSubmit({ passwordConfirm, ...values }) {
    return currentUserService.signup(values);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid, values, ...props }) => (
        <Form as={FormikForm}>
          <Box>
            <ValidatedTextField name="firstName" label="first name" errors={errors} touched={touched} flex={1} mr={2} />
            <ValidatedTextField name="lastName" label="last name" errors={errors} touched={touched} flex={1} ml={2} />
          </Box>
          <ValidatedTextField name="email" errors={errors} touched={touched} />
          <ValidatedTextField name="phone" label="Phone (Optional)" errors={errors} touched={touched} />
          <ValidatedTextField name="password" type="password" errors={errors} touched={touched} />
          <ValidatedTextField disabled={!values.password.length} name="passwordConfirm" label="confirm password" type="password" errors={errors} touched={touched} />
          <ButtonList>
            <Button variant="ghost" as={Link} to="/login">Login</Button>
            <Button type="submit" disabled={!isValid || currentUserLoading} variant={isValid ? 'primary' : 'disabled'}>Signup</Button>
          </ButtonList>
        </Form>
      )}
    </Formik>
  )
}
