import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';

import ResumeDialog from '../components/ResumeDialog';
import { MOCK_STEPS } from '../dev/constants';
import { useParams } from 'react-router';
import { useApi } from '../hooks/useApi';

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

const SwipePage = () => {
  const [users, setUsers] = useState([]);
  const { skillset } = useParams();
  const api = useApi();

  useEffect(() => {
    api.get(`/api/user/bySkillset?skillset=${skillset}`).then(res => {
      console.log(res);
      setUsers(res);
    });
  }, [skillset]);

  const classes = useStyles();
  const [viewResume, setViewResume] = useState(false);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = step => {
    setActiveStep(step);
  };

  // const currentStep = MOCK_STEPS[activeStep];
  const currentStep = users.length ? users[activeStep] : {};

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography variant="h6">{currentStep.name}</Typography>
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
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Grid container justify="center">
                <img className={classes.img} src={MOCK_STEPS[index].imgPath} alt={step.label} />
              </Grid>
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <div className={classes.skillsets}>
        {currentStep.skillsets &&
          currentStep.skillsets.map(skill => <Chip key={skill} label={skill} variant="outlined" />)}
      </div>
      <Typography variant="body2" style={{ paddingTop: '1rem' }}>
        {currentStep.bio}
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
        <ResumeDialog handleClose={() => setViewResume(false)} name={currentStep.name} />
      )}
    </div>
  );
};

export default SwipePage;
