import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
// providers
import { useCurrentUser } from '../../providers/CurrentUser';
// components
import { ValidatedTextField } from '../../components/ValidatedTextField';
// elements
import { Button } from '../../elements/Button';
import { ButtonList } from '../../elements/ButtonList';
import { Form } from '../../elements/Form';

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

export function ResetPasswordForm({ token }) {
  const { currentUserService } = useCurrentUser();

  const initialValues = {
    password: '',
    passwordConfirm: '',
  }

  function handleSubmit({ password }) {
    return currentUserService.resetPassword({ password, token });
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
