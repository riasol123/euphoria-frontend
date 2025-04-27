import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { ErrorAlertProps } from './ErrorAlertProps';
import { ErrorAlertStyle } from './ErrorAlertStyle';

export const ErrorAlert:React.FC<ErrorAlertProps> = ({ text, isError }) => {
  return (
    <Stack sx={ErrorAlertStyle.stack} spacing={2}>
      <Alert variant="filled" severity={isError ? 'error' : 'success'}>{text}</Alert>
    </Stack>
  );
}