import React from 'react';
import { useSnackbar } from 'notistack';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export const useSnackbars = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = key => (
    <IconButton onClick={() => closeSnackbar(key)}>
      <CloseIcon />
    </IconButton>
  );

  const showSnackbar = (message, configs) =>
    enqueueSnackbar(message, { autoHideDuration: 3000, action, ...configs });

  const showSnackbarSuccess = message => showSnackbar(message, { variant: 'success' });
  const showSnackbarError = message => showSnackbar(message, { variant: 'error' });

  return { showSnackbarSuccess, showSnackbarError };
};
