import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useApi } from '../hooks/useApi';
import SwipeUsersSection from '../components/SwipeUsersSection';
import { makeStyles } from '@material-ui/core';
import SwipeBusinessesSection from '../components/SwipeBusinessesSection';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const SwipeBusinesses = () => {
  const [businesses, setBusinesses] = useState(null);
  const [business, setBusiness] = useState(null);
  const { skillset } = useParams();
  const api = useApi();
  const classes = useStyles();

  useEffect(() => {
    api.get(`/api/business`).then(res => {
      console.log(res);
      setBusinesses([{ name: 'start-$buffer' }, ...res, { name: 'end-$buffer' }]);
    });

    api.get('/api/business/mine').then(res => {
      setBusiness(res);
    });
  }, [skillset]);

  const loading = !businesses;

  return (
    <div className={classes.root}>
      {!loading && <SwipeBusinessesSection businesses={businesses} />}
    </div>
  );
};

export default SwipeBusinesses;
