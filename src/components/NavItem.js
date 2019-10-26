import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const NavItem = ({ label, icon, route }) => {
  const classes = useStyles();
  return (
    <Link to={route} className={classes.root}>
    <ListItem button>
  <ListItemIcon>{icon}</ListItemIcon>
<ListItemText primary={label} />
</ListItem>
</Link>
  );
};

export default NavItem;
