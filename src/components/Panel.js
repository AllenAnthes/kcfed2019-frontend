import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(2),
    alignItems: 'center',
  },
  title: {
    marginLeft: 8,
    marginRight: 16,
    fontWeight: 'bold',
    fontSize: '1.5em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  content: {
    padding: theme.spacing(2),
  },
}));

const Panel = ({ title, children }) => {
  const classes = useStyles();
  return (
    <Paper>
      <Grid container spacing={1} alignItems="center" className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      </Grid>

      <Divider />

      <Grid container className={classes.content}>
        {children}
      </Grid>
    </Paper>
  );
};

export default Panel;
