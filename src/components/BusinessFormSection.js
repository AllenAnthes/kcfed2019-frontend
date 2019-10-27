import React from 'react';
import { Field, Form, Formik } from 'formik';
import { Grid, useTheme } from '@material-ui/core';
import MaterialInput from './MaterialInput';
import MaterialSelect from './MaterialSelect';
import { MOCK_CATEGORIES } from '../dev/constants';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';

import { useSnackbars } from '../hooks/useSnackbars';
import { useApi } from '../hooks/useApi';

const schema = yup.object().shape({
  name: yup
    .string()
    .nullable()
    .required(),
  pitch: yup
    .string()
    .nullable()
    .required(),
  category: yup
    .string()
    .nullable()
    .required(),
});

const BusinessFormSection = ({ business }) => {
  const { showSnackbarSuccess } = useSnackbars();
  const theme = useTheme();
  const api = useApi();

  const onSubmit = values => {
    console.log(values);
    showSnackbarSuccess('Save successful');
    api.post('/api/business', { body: values }).then(res => {
      console.log(res);
    });
  };

  return (
    <Grid container>
      <Formik initialValues={business} onSubmit={onSubmit} validationSchema={schema}>
        {({ isValid }) => (
          <Form>
            <Grid container spacing={4}>
              <Grid item xs={10} sm={8} md={6}>
                <Field component={MaterialInput} name="name" label="Business Name" fullWidth />
              </Grid>
              <Grid item xs={10} sm={8} md={7}>
                <Field
                  component={MaterialInput}
                  name="pitch"
                  label="Elevator Pitch"
                  rows={4}
                  multiline
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs={10} sm={8} md={6}>
              <Field component={MaterialInput} name="logoUrl" label="Logo Url" fullWidth />
            </Grid>
            <Grid item xs={10} sm={8} md={7}>
              <Field
                component={MaterialSelect}
                name="category"
                label="Business Category"
                options={MOCK_CATEGORIES.map(skillset => ({
                  value: skillset,
                  label: skillset,
                }))}
                fullWidth
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
        )}
      </Formik>
    </Grid>
  );
};

export default BusinessFormSection;
