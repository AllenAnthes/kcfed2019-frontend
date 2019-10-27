import React from 'react';
import ContainerWithSpacing from './ContainerWithSpacing';
import { Grid } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import MaterialSelect from './MaterialSelect';
import { MOCK_SKILLSETS } from '../dev/constants';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { getIconForSkillset } from '../util/skillsets';
import { Link } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const BusinessSkillsetSection = ({ business, updateSkillsets }) => {
  const { skillsets } = business;

  return (
    <>
      <ContainerWithSpacing>
        <Grid item xs={12}>
          <Formik
            initialValues={{ skillset: '' }}
            onSubmit={({ skillset }, { resetForm }) => {
              updateSkillsets(business.skillsets.concat(skillset));
              resetForm({ skillset: '' });
            }}
          >
            {({ resetForm }) => (
              <Form>
                <Grid item xs={12}>
                  <Field
                    component={MaterialSelect}
                    options={MOCK_SKILLSETS.filter(skill => !skillsets.includes(skill)).map(
                      category => ({
                        value: category,
                        label: category,
                      })
                    )}
                    onChange={val => {
                      updateSkillsets(business.skillsets.concat(val.value));
                      resetForm({ skillset: '' });
                    }}
                    name="skillset"
                    label="Desired Skillsets"
                  />
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </ContainerWithSpacing>
      <ContainerWithSpacing>
        {skillsets.length <= 0 ? (
          <Grid container justify="center">
            <Typography variant="caption" style={{ margin: '0.5rem' }}>
              Please add at least one desired skillset
            </Typography>
          </Grid>
        ) : (
          <List>
            {skillsets.map(skillset => (
              <ListItem key={skillset}>
                <ListItemAvatar>
                  <Avatar>{getIconForSkillset(skillset)}</Avatar>
                </ListItemAvatar>
                <Link
                  to={`/users/${skillset}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemText primary={skillset} secondary="Click to search" />
                </Link>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() =>
                      updateSkillsets(business.skillsets.filter(skill => skill !== skillset))
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
    </>
  );
};

export default BusinessSkillsetSection;
