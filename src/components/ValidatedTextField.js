import React from 'react';
import { Field, ErrorMessage } from 'formik';

import { Box } from '../elements/Box';
import { Label } from '../elements/Label';
import { TextField } from '../elements/TextField';

export const ValidatedTextField = ({
  disabled,
  name,
  label,
  type,
  touched,
  errors,
  placeholder,
  ...props
}) => {
  const labelText = label || name;
  const hasError = touched[name] && errors[name];
  return (
    <Box position="relative" flexDirection="column" {...props}>
      <Label htmlFor={name}>{labelText}</Label>
      <TextField
        as={Field}
        id={name}
        name={name}
        type={type}
        variant={hasError && 'danger'}
        disabled={disabled}
        placeholder={type === 'password' ? '••••••••••••' : placeholder}
      />
      <ErrorMessage name={name} component={TextField.ErrorMessage} />
    </Box>
  );
}

ValidatedTextField.defaultProps = {
  type: 'text',
};
