import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, TextField } from '@material-ui/core';
import Panel from '../components/Panel';
import { useApi } from '../hooks/useApi';
import { useSnackbars } from '../hooks/useSnackbars';

const PublicMessages = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const { showSnackbarSuccess, showSnackbarError } = useSnackbars();
  const api = useApi();

  const getPublicMesages = () =>
    api
      .get('/api/message')
      .then(setMessages)
      .catch(err => showSnackbarError(err.message));

  function createPublicMessage(e) {
    e.preventDefault();
    api
      .post('/api/message', { body: { text } })
      .then(data => setMessages(prevMessages => prevMessages.concat(data)))
      .then(() => setText(''))
      .then(() => showSnackbarSuccess('Created new message!'))
      .catch(err => showSnackbarError(err));
  }

  return (
    <Panel title="Public messages">
      <Grid container justify="center" alignContent="center" spacing={10}>
        <Grid item xs={12}>
          <form onSubmit={createPublicMessage}>
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
          <Button onClick={getPublicMesages}>Get Public Messages</Button>
        </Grid>
        <Grid item xs={12}>
          <pre>{messages && JSON.stringify(messages, null, 2)}</pre>
        </Grid>
      </Grid>
    </Panel>
  );
};

export default PublicMessages;
