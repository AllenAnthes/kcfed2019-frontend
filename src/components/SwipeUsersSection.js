import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useApi } from '../hooks/useApi';
import { useTheme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import ResumeDialog from './ResumeDialog';
import makeStyles from '@material-ui/styles/makeStyles';

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
    height: 255,
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

const SwipeUsersSection = ({ users }) => {
  const { skillset } = useParams();
  const api = useApi();

  const classes = useStyles();
  const [viewResume, setViewResume] = useState(false);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(1);

  const handleStepChange = (step, prev, meta) => {
    console.log({ step, a: prev, meta });
    if (step > prev) {
      console.log('swipe left');
    } else {
      console.log('swipe right');
      api.post('/api/business/likeUser', { body: users[prev] }).then(res => {
        console.log(res);
      });
    }
    setActiveStep(prev + 1);
  };

  const currentUser = users.length ? users[activeStep] : {};

  return (
    <div className={classes.root}>
      {currentUser.name.includes('$buffer') ? (
        <Grid container justify="center">
          <Typography variant="caption">No more peeps</Typography>
        </Grid>
      ) : (
        <>
          <Paper square elevation={0} className={classes.header}>
            <Typography variant="h6">{currentUser.name}</Typography>
            <Typography variant="caption" style={{ marginLeft: '1rem' }}>
              {skillset}
            </Typography>
          </Paper>

          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {users.map((step, index) => (
              <div key={step.name}>
                {Math.abs(activeStep - index) <= 2 || users[index].name.includes('$buffer') ? (
                  <Grid container justify="center">
                    <img
                      className={classes.img}
                      src={currentUser.imageUrl}
                      alt={currentUser.name}
                    />
                  </Grid>
                ) : null}
              </div>
            ))}
          </SwipeableViews>

          <div className={classes.skillsets}>
            {currentUser.skillsets &&
              currentUser.skillsets.map(skill => (
                <Chip key={skill} label={skill} variant="outlined" />
              ))}
          </div>
          <Typography variant="body2" style={{ paddingTop: '1rem' }}>
            {currentUser.bio}
          </Typography>
          <Button
            style={{ marginTop: '1rem' }}
            variant="contained"
            color="primary"
            onClick={() => setViewResume(true)}
          >
            View Resume
          </Button>
          {viewResume && (
            <ResumeDialog handleClose={() => setViewResume(false)} name={currentUser.name} />
          )}
        </>
      )}
    </div>
  );
};

export default SwipeUsersSection;
