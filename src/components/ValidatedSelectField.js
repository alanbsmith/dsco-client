import React from 'react';
import { ErrorMessage } from 'formik';

import { Box } from '../elements/Box';
import { Label } from '../elements/Label';
import { Select } from '../elements/Select';

export const ValidatedSelectField = ({
  children,
  errors,
  handleBlur,
  handleChange,
  label,
  name,
  rows,
  touched,
  type,
  values,
  ...props
}) => {
  const labelText = label || name;
  const hasError = touched[name] && errors[name];
  return (
    <Box position="relative" flexDirection="column" {...props}>
      <Label htmlFor={name}>{labelText}</Label>
      <Select
        id={name}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values[name]}
        variant={hasError && 'danger'}
      >
        {children}
      </Select>
      <ErrorMessage name={name} component={Select.ErrorMessage} />
    </Box>
  )
}
