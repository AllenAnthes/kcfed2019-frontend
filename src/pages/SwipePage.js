import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useParams } from 'react-router';
import { useApi } from '../hooks/useApi';
import SwipeUsersSection from '../components/SwipeUsersSection';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const SwipePage = () => {
  const [users, setUsers] = useState(null);
  const [business, setBusiness] = useState(null);
  const { skillset } = useParams();
  const api = useApi();
  const classes = useStyles();

  const getUsersUrl = skillset ? `/api/user/bySkillset?skillset=${skillset}` : '/api/user';

  useEffect(() => {
    api.get(getUsersUrl).then(res => {
      console.log(res);
      setUsers([{ name: 'start-$buffer' }, ...res, { name: 'end-$buffer' }]);
    });

    api.get('/api/business/mine').then(res => {
      setBusiness(res);
    });
  }, [skillset]);

  const loading = !users || !business;

  return <div className={classes.root}>{!loading && <SwipeUsersSection users={users} />}</div>;
};

export default SwipePage;
