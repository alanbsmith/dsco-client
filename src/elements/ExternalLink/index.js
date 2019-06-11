import React from 'react';
import { Link } from '../Link';

export function ExternalLink(props) {
  return <Link as="a" target="_blank" rel="noopener noreferrer" {...props} />
}
