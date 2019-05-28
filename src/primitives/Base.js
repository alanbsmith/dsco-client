import React from 'react';
import styled from '@emotion/styled';
import shouldForwardProp from '@styled-system/should-forward-prop';

export const Base = (tag = 'div') => {
  return styled(
    props => {
      return React.createElement(tag, props);
    },
    { shouldForwardProp }
  );
};
