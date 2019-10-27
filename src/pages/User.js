import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/styles/makeStyles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import ResumeDialog from '../components/ResumeDialog';
import { useParams } from 'react-router';
import { useApi } from '../hooks/useApi';
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

const User = ({ user }) => {
  const classes = useStyles();
  const [viewResume, setViewResume] = useState(false);

  return (
    <div>
      <Paper square elevation={0} className={classes.header}>
        <Typography variant="h6">{user.name}</Typography>
      </Paper>

      <Grid container justify="center">
        <img className={classes.img} src={user.imageUrl} />
      </Grid>

      <div className={classes.skillsets}>
        {user.skillsets &&
          user.skillsets.map(skill => <Chip key={skill} label={skill} variant="outlined" />)}
      </div>
      <Typography variant="body2" style={{ paddingTop: '1rem' }}>
        {user.bio}
      </Typography>
      <ContainerWithSpacing>
        <Grid item>
          <Button
            style={{ marginTop: '1rem' }}
            variant="contained"
            color="primary"
            onClick={() => setViewResume(true)}
          >
            View Resume
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{ marginTop: '1rem' }}
            variant="contained"
            color="primary"
            onClick={() => {}}
          >
            Message User
          </Button>
        </Grid>
      </ContainerWithSpacing>
      {viewResume && <ResumeDialog handleClose={() => setViewResume(false)} name={user.name} />}
    </div>
  );
};

const Wrapper = () => {
  const { id } = useParams();
  const api = useApi();

  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get(`/api/user/byId/${id}`).then(res => {
      setUser(res);
    });
  }, [id]);

  return user ? <User user={user} /> : <Typography variant="caption">Loading...</Typography>;
};

export default Wrapper;
