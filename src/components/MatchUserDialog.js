import React from 'react';
import { Dialog } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Link } from 'react-router-dom';

const MatchUserDialog = ({ onClose, user }) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Match Found!</DialogTitle>
      <DialogContent>
        <Link to={`/user/${user.id}`}>
          <DialogContentText>Click here to go to their profile!</DialogContentText>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default MatchUserDialog;
