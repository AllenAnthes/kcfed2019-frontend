import React from 'react';
import { Dialog } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Link } from 'react-router-dom';

const MatchBusinessDialog = ({ onClose, business }) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Match Found!</DialogTitle>
      <DialogContent>
        <Link to={`/business/${business.id}`}>
          <DialogContentText variant="h6">
            Click here to go to the business' page!
          </DialogContentText>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default MatchBusinessDialog;
