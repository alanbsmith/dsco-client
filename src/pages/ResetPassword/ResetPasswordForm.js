import React from 'react';
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

const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordCredentials!) {
    resetPassword(input: $input) {
      user {
        ${currentUserParams}
      }
      token
    }
  }
`;

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  passwordConfirm: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords do not match')
});

export function ResetPasswordForm({ tokenParam }) {
  const { setCurrentUser } = useCurrentUser();
  const [resetPassword] = useMutation(RESET_PASSWORD);

  const initialValues = {
    password: '',
    passwordConfirm: '',
  }

  async function handleSubmit({ password }) {
    const credentials = { password, token: tokenParam };
    await resetPassword({ variables: { input: credentials } }).then(({ data }) => {
      AuthToken.set(data.resetPassword.token);

      if (data.resetPassword.user) {
        setCurrentUser(data.resetPassword.user)
      }
    }).catch(err => {
      console.log(err)
      console.log('ERROR: ', err.message)
    });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={resetPasswordSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid }) => (
        <Form as={FormikForm}>
          <ValidatedTextField name="password" type="password" errors={errors} touched={touched} />
          <ValidatedTextField name="passwordConfirm" label="confirm password" type="password" errors={errors} touched={touched} />
          <ButtonList>
            <Button type="submit" disabled={!isValid} variant={isValid ? 'primary' : 'disabled'}>Submit</Button>
          </ButtonList>
        </Form>
      )}
    </Formik>
  );
}
