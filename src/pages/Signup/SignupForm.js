import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
// utils
import { AuthToken } from '../../utils/authToken';
// providers
import { useCurrentUser } from '../../providers/CurrentUser';
import { currentUserParams } from '../../providers/CurrentUser/query';
// components
import { ValidatedTextField } from '../../components/ValidatedTextField';
// elements
import { Button } from '../../elements/Button';
import { ButtonList } from '../../elements/ButtonList';
import { Box } from '../../elements/Box';
import { Form } from '../../elements/Form';

const SIGNUP = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      user {
        ${currentUserParams}
      }
      token
    }
  }
`;

export function SignupForm() {
  const { setCurrentUser } = useCurrentUser();
  const [signup] = useMutation(SIGNUP);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const signupSchema = yup.object().shape({
    firstName: yup
      .string('First name is required')
      .required('Last name is required'),
    lastName: yup
      .string()
      .required(),
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
      .required('Password confirmation is required')
      .oneOf([yup.ref('password')], 'Passwords do not match')
  });


  async function handleSubmit({ passwordConfirm, ...values }) {
    await signup({ variables: { input: values } }).then(({ data }) => {
      AuthToken.set(data.signup.token);

      if (data.signup.user) {
        setCurrentUser(data.signup.user)
      }
    }).catch(err => {
      console.log(err)
      console.log('ERROR: ', err.message)
    });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid, ...props }) => (
        <Form as={FormikForm}>
          <Box>
            <ValidatedTextField name="firstName" label="first name" errors={errors} touched={touched} flex={1} mr={2} />
            <ValidatedTextField name="lastName" label="last name" errors={errors} touched={touched} flex={1} ml={2} />
          </Box>
          <ValidatedTextField name="email" errors={errors} touched={touched} />
          <ValidatedTextField name="phone" errors={errors} touched={touched} />
          <ValidatedTextField name="password" type="password" errors={errors} touched={touched} />
          <ValidatedTextField name="passwordConfirm" label="confirm password" type="password" errors={errors} touched={touched} />
          <ButtonList>
            <Button variant="ghost" as={Link} to="/login">Login</Button>
            <Button type="submit" disabled={!isValid} variant={isValid ? 'primary' : 'disabled'}>Signup</Button>
          </ButtonList>
        </Form>
      )}
    </Formik>
  )
}
