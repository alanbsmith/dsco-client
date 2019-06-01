import React from 'react';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
// components
import { ValidatedTextField } from '../../components/ValidatedTextField';
// elements
import { Button } from '../../elements/Button';
import { ButtonList } from '../../elements/ButtonList';
import { Form } from '../../elements/Form';

const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      status
    }
  }
`;

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Email is required'),
});

export function ForgotPasswordForm() {
  const [forgotPassword] = useMutation(FORGOT_PASSWORD);

  const initialValues = {
    email: '',
  }

  async function handleSubmit(values) {
    await forgotPassword({ variables: { input: values } }).then(({ data }) => {

      if (data.forgotPassword.status) {
        console.log(data.forgotPassword.status)
        return <Redirect to="/login" />
      }
    }).catch(err => {
      console.log(err)
      console.log('ERROR: ', err.message)
    });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={forgotPasswordSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid }) => (
        <Form as={FormikForm}>
          <ValidatedTextField errors={errors} touched={touched} name="email" />
          <ButtonList>
            <Button type="submit" disabled={!isValid} variant={isValid ? 'primary' : 'disabled'}>Submit</Button>
          </ButtonList>
        </Form>
      )}
    </Formik>
  );
}
