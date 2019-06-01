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
import { Form } from '../../elements/Form';

const LOGIN = gql`
  mutation Login($input: UserCredentials!) {
    login(input: $input) {
      user {
        ${currentUserParams}
      }
      token
    }
  }
`;

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
});

export function LoginForm() {
  const { setCurrentUser } = useCurrentUser();
  const [login] = useMutation(LOGIN);

  const initialValues = {
    email: '',
    password: '',
  }

  async function handleSubmit(values) {
    await login({ variables: { input: values } }).then(({ data }) => {
      AuthToken.set(data.login.token);

      if (data.login.user) {
        setCurrentUser(data.login.user)
      }
    }).catch(err => {
      console.log(err)
      console.log('ERROR: ', err.message)
    });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid }) => (
        <Form as={FormikForm}>
          <ValidatedTextField errors={errors} touched={touched} name="email" />
          <ValidatedTextField errors={errors} touched={touched} name="password" type="password" />

          <ButtonList>
            <Button variant="ghost" as={Link} to="/signup">
              Signup
        </Button>
            <Button type="submit" disabled={!isValid} variant={isValid ? 'primary' : 'disabled'}>Login</Button>
          </ButtonList>
        </Form>
      )}
    </Formik>
  )
}
