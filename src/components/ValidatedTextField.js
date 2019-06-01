import React from 'react';
import { Field, ErrorMessage } from 'formik';

import { Box } from '../elements/Box';
import { Label } from '../elements/Label';
import { TextField } from '../elements/TextField';

export const ValidatedTextField = ({ name, label, type, touched, errors, ...props }) => {
  const labelText = label || name;
  const hasError = touched[name] && errors[name];
  return (
    <Box position="relative" flexDirection="column" {...props}>
      <Label htmlFor={name}>{labelText}</Label>
      <TextField as={Field} variant={hasError && 'danger'} name={name} type={type} />
      <ErrorMessage name={name} component={TextField.ErrorMessage} />
    </Box>
  );
}

ValidatedTextField.defaultProps = {
  type: 'text',
};