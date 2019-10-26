import React, { useState } from 'react';
import { Grid, Card, CardContent, Paper, makeStyles, Button } from '@material-ui/core';

import { useApi } from '../hooks/useApi';
import { useSnackbars } from '../hooks/useSnackbars';

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
    borderRadius: 10,
  },
  paper: {
    borderRadius: 10,
  },
  content: {
    padding: '48px',
    margin: '1rem',
  },
  container: {
    width: '100%',
    margin: 'auto',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    margin: '1rem',
  },
  button: {
    width: '100%',
  },
}));

const ClickStuff = () => {
  const classes = useStyles();
  const api = useApi();
  const { showSnackbarError, showSnackbarSuccess } = useSnackbars();

  const [response, setResponse] = useState(null);

  const callPublicApi = () =>
    api
      .get('/api/test/public')
      .then(setResponse)
      .then(() => showSnackbarSuccess('Success!'))
      .catch(err => showSnackbarError(err.message));

  const callPrivateApi = () =>
    api
      .get('/api/test/private')
      .then(setResponse)
      .catch(err => showSnackbarError(err.message));

  return (
    <Grid container direction="column" spacing={10} className={classes.container}>
      <Grid item>
        <Paper className={classes.paper}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Grid container spacing={10} justify="center" alignContent="center">
                <Grid item xs={12} sm={6}>
                  <Button className={classes.button} onClick={callPublicApi}>
                    Public API Call
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button className={classes.button} onClick={callPrivateApi}>
                    Private API Call
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      </Grid>

      <Grid item>
        <Paper className={classes.paper}>
          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <Grid container justify="center" alignContent="center" spacing={10}>
                <Grid item xs={12}>
                  {response && JSON.stringify(response, null, 2)}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ClickStuff;
