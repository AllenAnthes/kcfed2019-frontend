import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';

import Panel from '../components/Panel';
import ContainerWithSpacing from '../components/ContainerWithSpacing';
import Typography from '@material-ui/core/Typography';

import BusinessFormSection from '../components/BusinessFormSection';
import { useApi } from '../hooks/useApi';
import BusinessSkillsetSection from '../components/BusinessSkillsetSection';
import LikedUsers from '../components/LikedUsers';

const MyBusiness = () => {
  const [business, setBusiness] = useState(null);
  const api = useApi();

  useEffect(() => {
    api.get('/api/business/mine').then(res => {
      setBusiness(res);
    });
  }, []);

  const updateSkillsets = skillsets => {
    api
      .post('/api/business', {
        body: {
          ...business,
          skillsets,
        },
      })
      .then(res => {
        setBusiness(res);
      });
  };

  return (
    <ContainerWithSpacing>
      <Grid item xs={12}>
        <Panel title="My Business">
          {business ? <BusinessFormSection business={business} /> : <Typography>Loading...</Typography>}
        </Panel>
      </Grid>
      <Grid item xs={12}>
        <Panel title="Find Teammates">
          {business ? (
            <BusinessSkillsetSection business={business} updateSkillsets={updateSkillsets} />
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Panel>
      </Grid>
      <Grid item xs={12}>
        <Panel title="Liked Users">{business && <LikedUsers users={business.likedUsers} />}</Panel>
      </Grid>
    </ContainerWithSpacing>
  );
};

export default MyBusiness;
