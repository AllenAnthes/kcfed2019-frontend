import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FileViewer from 'react-file-viewer';

import resume from '../dev/Demietry Huff Resume 8.1.2019 (1).docx';

export default function ResumeDialog({ handleClose, name }) {
  return (
    <Dialog
      open
      fullWidth
      onClose={handleClose}
      maxWidth={false}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{name}</DialogTitle>
      <DialogContent>
        <FileViewer fileType="docx" filePath={resume} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
