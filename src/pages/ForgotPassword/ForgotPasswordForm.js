import React from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
// components
import { useCurrentUser } from '../../providers/CurrentUser';
import { ValidatedTextField } from '../../components/ValidatedTextField';
// elements
import { Button } from '../../elements/Button';
import { ButtonList } from '../../elements/ButtonList';
import { Form } from '../../elements/Form';

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('Email is required'),
});

export function ForgotPasswordForm() {
  const { currentUserService } = useCurrentUser();

  const initialValues = {
    email: '',
  }

  function handleSubmit(values) {
    currentUserService.forgotPassword(values);
    return <Redirect to="/" />;
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
