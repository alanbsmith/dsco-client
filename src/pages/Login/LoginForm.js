import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';

import { useCurrentUser } from '../../providers/CurrentUser';
// components
import { ValidatedTextField } from '../../components/ValidatedTextField';
// elements
import { Box } from '../../elements/Box';
import { Button } from '../../elements/Button';
import { ButtonList } from '../../elements/ButtonList';
import { Form } from '../../elements/Form';
import { Link } from '../../elements/Link';

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
  const { currentUserService } = useCurrentUser();

  const initialValues = {
    email: '',
    password: '',
  }

  function handleSubmit(values) {
    return currentUserService.login(values)
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
          <Box justifyContent="flex-end" mt={2}>
            <Link to="/forgot_password" fontSize="sm">Forgot Password?</Link>
          </Box>
        </Form>
      )}
    </Formik>
  )
}
