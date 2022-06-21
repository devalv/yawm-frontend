import * as React from 'react';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

export default function ErrorStack({ props }) {
  const errorText =
    props.errorState.type === 'badAuth' && props.errorState.hasError
      ? 'Не получилось узнать Вас, выполните вход'
      : 'С данными что-то не так. Проверьте значение поля';
  if (!props.errorState.hasError) {
    return null;
  }
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{errorText}</Alert>
    </Stack>
  );
}
