import React, { useState } from 'react';
import { Grid, useTheme } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';

import Panel from '../components/Panel';
import MaterialSelect from '../components/MaterialSelect';
import { MOCK_CATEGORIES, MOCK_SKILLSETS } from '../dev/constants';
import MaterialInput from '../components/MaterialInput';
import { useSnackbars } from '../hooks/useSnackbars';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import ContainerWithSpacing from '../components/ContainerWithSpacing';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import { Link } from 'react-router-dom';
import { getIconForSkillset } from '../util/skillsets';
const schema = yup.object().shape({
  name: yup.string().required(),
  pitch: yup.string().required(),
  category: yup.string().required(),
});

const INITIAL_VALUES = { name: '', skillsets: [], bio: '' };

const MyBusiness = () => {
  const { showSnackbarSuccess } = useSnackbars();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  //TODO: api call
  // const desiredSkillsets = ['Front-end Developer'];
  const [desiredSkillsets, setDesiredSkillsets] = useState(['Front-end Developer']);

  const onSubmit = values => {
    console.log(values);
    showSnackbarSuccess('Save successful');
  };

  return (
    <ContainerWithSpacing>
      <Grid item xs={12}>
        <Panel title="My Business">
          <Grid container justify={isMobile ? undefined : 'center'}>
            <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit} validationSchema={schema}>
              {({ isValid }) => (
                <Form>
                  <Grid container spacing={4}>
                    <Grid item xs={10} sm={8} md={6}>
                      <Field
                        component={MaterialInput}
                        name="name"
                        label="Business Name"
                        fullWidth
                      />
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
        </Panel>
      </Grid>
      <Grid item xs={12}>
        <Panel title="Find Teammates">
          <ContainerWithSpacing>
            <Grid item xs={12}>
              <Formik
                initialValues={{ skillset: '' }}
                onSubmit={({ skillset }, { resetForm }) => {
                  setDesiredSkillsets(prevSkillsets => prevSkillsets.concat(skillset));
                  resetForm({ skillset: '' });
                }}
              >
                <Form>
                  <Grid item xs={12}>
                    <Field
                      component={MaterialSelect}
                      options={MOCK_SKILLSETS.map(category => ({
                        value: category,
                        label: category,
                      }))}
                      name="skillset"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="outlined" color="primary" type="submit">
                      Add Skillset
                    </Button>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </ContainerWithSpacing>
          <ContainerWithSpacing>
            {desiredSkillsets.length <= 0 ? (
              <Grid container justify="center">
                <Typography variant="caption" style={{ margin: '0.5rem' }}>
                  Please add at least one desired skillset
                </Typography>
              </Grid>
            ) : (
              <List>
                {desiredSkillsets.map(skillset => (
                  <ListItem key={skillset}>
                    <ListItemAvatar>
                      <Avatar>{getIconForSkillset(skillset)}</Avatar>
                    </ListItemAvatar>
                    <Link
                      to={`/swipe/${skillset}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ListItemText primary={skillset} secondary="Click to search" />
                    </Link>
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() =>
                          setDesiredSkillsets(skillsets =>
                            skillsets.filter(skill => skill !== skillset)
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </ContainerWithSpacing>
        </Panel>
      </Grid>
    </ContainerWithSpacing>
  );
};

export default MyBusiness;
