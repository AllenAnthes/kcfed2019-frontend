import React, { useState } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';

import { useApi } from '../hooks/useApi';
import Panel from '../components/Panel';
import AuthenticatedPage from '../components/AuthenticatedPage';
import { useSnackbars } from '../hooks/useSnackbars';

const PrivateMessages = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const { showSnackbarSuccess, showSnackbarError } = useSnackbars();
  const api = useApi();

  function getPrivateMesages() {
    api
      .get('/private/api/message')
      .then(setMessages)
      .catch(err => showSnackbarError(err.message));
  }

  function createPrivateMessage(e) {
    e.preventDefault();
    api
      .post('/private/api/message', { body: { text } })
      .then(data => setMessages(prevMessages => prevMessages.concat(data)))
      .then(() => setText(''))
      .then(() => showSnackbarSuccess('Created new message!'))
      .catch(err => showSnackbarError(err.message));
  }

  return (
    <AuthenticatedPage>
      <Panel title="Private messages">
        <Grid container justify="center" alignContent="center" spacing={10}>
          <Grid item xs={12}>
            <form onSubmit={createPrivateMessage}>
              <Grid item xs={12}>
                <TextField
                  rows="4"
                  multiline
                  label="Message Text"
                  id="messageText"
                  margin="normal"
                  value={text}
                  onChange={e => setText(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit">Create Message</Button>
              </Grid>
            </form>
          </Grid>

          <Grid item xs={12}>
            <Button onClick={getPrivateMesages}>Get Private Messages</Button>
          </Grid>
          <Grid item xs={12}>
            <pre>{messages && JSON.stringify(messages, null, 2)}</pre>
          </Grid>
        </Grid>
      </Panel>
    </AuthenticatedPage>
  );
};

export default PrivateMessages;
