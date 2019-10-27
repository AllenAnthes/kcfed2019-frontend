import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useApi } from '../hooks/useApi';
import { useTheme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import makeStyles from '@material-ui/styles/makeStyles';
import MatchBusinessDialog from './MatchBusinessDialog';

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

const SwipeSection = ({ businesses, authedUser }) => {
  const { skillset } = useParams();
  const api = useApi();

  const [matchedBusiness, setMatchedBusiness] = useState(null);

  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(1);

  const handleStepChange = (step, prev) => {
    if (step > prev) {
      console.log('swiped left');
    } else {
      console.log('swiped right');
      api.post('/api/user/likeBusiness', { body: businesses[prev] }).then(business => {
        console.log(business);
        if (business.likedUsers.some(user => user.id === authedUser.id)) {
          setMatchedBusiness(business);
          console.log('YAYYY');
        }
      });
    }
    setActiveStep(prev + 1);
  };

  const currentBusiness = businesses.length ? businesses[activeStep] : {};

  return (
    <div className={classes.root}>
      {currentBusiness.name && currentBusiness.name.includes('$buffer') ? (
        <Grid container justify="center">
          <Typography variant="caption">No more businesses</Typography>
        </Grid>
      ) : (
        <>
          <Paper square elevation={0} className={classes.header}>
            <Typography variant="h6">{currentBusiness.name}</Typography>
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
            {businesses.map((step, index) => (
              <div key={step.name}>
                {Math.abs(activeStep - index) <= 2 || businesses[index].name.includes('$buffer') ? (
                  <Grid container justify="center">
                    <img className={classes.img} src={currentBusiness.logoUrl} alt={step.name} />
                  </Grid>
                ) : null}
              </div>
            ))}
          </SwipeableViews>

          <div className={classes.skillsets}>
            {currentBusiness.skillsets &&
              currentBusiness.skillsets.map(skill => (
                <Chip key={skill} label={skill} variant="outlined" />
              ))}
          </div>
          <Typography variant="body2" style={{ paddingTop: '1rem' }}>
            {currentBusiness.pitch}
          </Typography>
        </>
      )}
      {matchedBusiness && (
        <MatchBusinessDialog onClose={() => setMatchedBusiness(null)} business={matchedBusiness} />
      )}
    </div>
  );
};

export default SwipeSection;
