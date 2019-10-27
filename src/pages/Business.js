import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/styles/makeStyles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { useParams } from 'react-router';
import { useApi } from '../hooks/useApi';
import Button from '@material-ui/core/Button';
import ContainerWithSpacing from '../components/ContainerWithSpacing';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  skillsets: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const Business = ({ business }) => {
  const classes = useStyles();

  return (
    <>
      <Paper square elevation={0} className={classes.header}>
        <Typography variant="h6">{business.name}</Typography>
      </Paper>
      <div>
        <Grid container justify="center">
          <img className={classes.img} src={business.logoUrl} alt={business.name} />
        </Grid>
      </div>

      <div className={classes.skillsets}>
        {business.skillsets &&
          business.skillsets.map(skill => <Chip key={skill} label={skill} variant="outlined" />)}
      </div>
      <Typography variant="body2" style={{ paddingTop: '1rem' }}>
        {business.pitch}
      </Typography>

      <Grid item>
        <Button
          style={{ marginTop: '1rem' }}
          variant="contained"
          color="primary"
          onClick={() => {}}
        >
          Message Business Owner
        </Button>
      </Grid>
    </>
  );
};

const Wrapper = () => {
  const { id } = useParams();
  const api = useApi();

  const [business, setBusiness] = useState(null);

  useEffect(() => {
    api.get(`/api/business/byId/${id}`).then(res => {
      setBusiness(res);
    });
  }, [id]);

  return business ? (
    <Business business={business} />
  ) : (
    <Typography variant="caption">Loading...</Typography>
  );
};

export default Wrapper;
