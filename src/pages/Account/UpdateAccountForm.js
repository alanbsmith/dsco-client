import React from 'react';

import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
// components
import { ValidatedTextField } from '../../components/ValidatedTextField';
// elements
import { Box } from '../../elements/Box';
import { Button } from '../../elements/Button';
import { ButtonList } from '../../elements/ButtonList';
import { Form } from '../../elements/Form';

// providers
import { useCurrentUser } from '../../providers/CurrentUser';

export function UpdateAccountForm({ handleClose }) {
  const { currentUser, currentUserLoading, currentUserService } = useCurrentUser();

  const initialValues = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phone: currentUser.phone,
    password: '',
    passwordConfirm: '',
  }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const updateSchema = yup.object().shape({
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

  function handleSubmit({ password, passwordConfirm, ...values }) {
    const { id } = currentUser;
    const updated = password.length ? { ...values, password, id } : { ...values, id };
    currentUserService.updateCurrentUser(updated);
    return handleClose();
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updateSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isValid, values, ...props }) => (
        <Form as={FormikForm} autoComplete="off">
          <Box>
            <ValidatedTextField name="firstName" label="first name" errors={errors} touched={touched} flex={1} mr={2} />
            <ValidatedTextField name="lastName" label="last name" errors={errors} touched={touched} flex={1} ml={2} />
          </Box>
          <ValidatedTextField name="email" errors={errors} touched={touched} />
          <ValidatedTextField name="phone" label="Phone (Optional)" errors={errors} touched={touched} />
          <ValidatedTextField name="password" type="password" errors={errors} touched={touched} />
          <ValidatedTextField disabled={!values.password.length} name="passwordConfirm" label="confirm password" type="password" errors={errors} touched={true} />
          <ButtonList>
            <Button variant="ghost" onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={!isValid || currentUserLoading} variant={isValid ? 'primary' : 'disabled'}>Update</Button>
          </ButtonList>
        </Form>
      )}
    </Formik>
  )
}