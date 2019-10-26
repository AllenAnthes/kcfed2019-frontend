import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  container: {
    padding: '1rem',
    width: '100%',
  },
}));

const ContainerWithSpacing = props => {
  const classes = useStyles();
  return <Grid classes={{ container: classes.container }} container spacing={3} {...props} />;
};

export default ContainerWithSpacing;
