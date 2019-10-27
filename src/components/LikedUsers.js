import React from 'react';
import ContainerWithSpacing from './ContainerWithSpacing';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import makeStyles from '@material-ui/styles/makeStyles/makeStyles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  skillsets: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const LikedUsers = ({ users }) => {
  const classes = useStyles();
  return (
    <ContainerWithSpacing>
      <List>
        {users.map(user => (
          <Link key={user.id} to={`/user/${user.id}`} className={classes.link}>
            <ListItem key={user.id} className={classes.listItem}>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>

              <Typography variant="body2">{user.name}</Typography>
              <Grid
                className={classes.skillsets}
                container
                alignItems="center"
                justify="flex-end"
                spacing={2}
              >
                {user.skillsets &&
                  user.skillsets.map(skill => (
                    <Grid item>
                      <Chip key={skill} label={skill} variant="outlined" />
                    </Grid>
                  ))}
              </Grid>
            </ListItem>
          </Link>
        ))}
      </List>
    </ContainerWithSpacing>
  );
};

export default LikedUsers;
