import React from 'react';
import { FullsizePicture } from 'react-responsive-picture';

import logoFull from '../images/logo-full.png';

const Home = () => {
  return (
    <div style={{ height: 200 }}>
      <FullsizePicture src={logoFull} cover="height" />
    </div>
  );
};

export default Home;
