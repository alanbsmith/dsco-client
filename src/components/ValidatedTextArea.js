import React from 'react';
import { ErrorMessage } from 'formik';

import { Box } from '../elements/Box';
import { Label } from '../elements/Label';
import { TextArea } from '../elements/TextArea';

export const ValidatedTextArea = ({
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
      <TextArea
        id={name}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        rows={rows}
        value={values[name]}
        variant={hasError && 'danger'}
      />
      <ErrorMessage name={name} component={TextArea.ErrorMessage} />
    </Box >
  );
}

ValidatedTextArea.defaultProps = {
  rows: 4,
}
