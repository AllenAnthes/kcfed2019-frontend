import React from 'react';
import { Grid } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';

import Panel from '../components/Panel';
import MaterialSelect from '../components/MaterialSelect';
import { MOCK_SKILLSETS } from '../dev/constants';
import MaterialInput from '../components/MaterialInput';
import { useSnackbars } from '../hooks/useSnackbars';
import { useApi } from '../hooks/useApi';
import AuthenticatedPage from '../components/AuthenticatedPage';

const schema = yup.object().shape({
  name: yup.string().required(),
  skillsets: yup
    .array()
    .of(yup.string())
    .min(1)
    .required(),
  bio: yup.string().required(),
});

const INITIAL_VALUES = { name: '', skillsets: [], bio: '' };

const Profile = () => {
  const { showSnackbarSuccess } = useSnackbars();
  const api = useApi();

  const onSubmit = ({ image, resume, ...values }) => {
    console.log(values);
    showSnackbarSuccess('Save successful');
    api.post('/api/user', { body: values }).then(res => {
      console.log(res);

      if (image || resume) {
        const data = new FormData();
        image.length && data.append('image', image[0]);
        resume.length && data.append('resume', resume[0]);
        api.putFile(`/api/user/${res.id}/image`, { body: data }).then(res => {
          console.log(res);
        });
      }
    });
  };

  return (
    <AuthenticatedPage>
      {user => {
        console.log(user);
        return (
          <Panel title="My Profile">
            <Grid container justify="center">
              <Formik initialValues={user} onSubmit={onSubmit} validationSchema={schema}>
                {({ setFieldValue, isValid, values }) => {
                  return (
                    <Form>
                      <Grid container spacing={4}>
                        <Grid item xs={10} sm={8} md={6}>
                          <Field component={MaterialInput} name="name" label="Name" fullWidth />
                        </Grid>
                        <Grid item xs={10} sm={8} md={7}>
                          <Field
                            component={MaterialSelect}
                            name="skillsets"
                            label="Skillsets"
                            options={MOCK_SKILLSETS.map(skillset => ({
                              value: skillset,
                              label: skillset,
                            }))}
                            isMulti
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={10} sm={8} md={6}>
                          <Field
                            component={MaterialInput}
                            name="imageUrl"
                            label="Headshot Url (optional)"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={10} sm={8} md={7}>
                          <Field
                            component={MaterialInput}
                            name="bio"
                            label="Bio (summary)"
                            rows={4}
                            multiline
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={10} sm={8} md={7}>
                        <DropzoneArea
                          dropzoneText="Drag and drop a resume file here or click"
                          onChange={val => setFieldValue('resume', val)}
                          filesLimit={1}
                          acceptedFiles={[
                            'application/pdf',
                            'application/msword',
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            'text/*',
                          ]}
                          maxFileSize={4000000}
                          showFileNames
                        />
                      </Grid>
                      <Button
                        disabled={!isValid}
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ marginTop: '1rem' }}
                      >
                        Submit
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </Grid>
          </Panel>
        );
      }}
    </AuthenticatedPage>
  );
};

export default Profile;
