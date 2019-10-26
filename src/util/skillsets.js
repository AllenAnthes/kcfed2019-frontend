import React from 'react';
import StorageIcon from '@material-ui/icons/Storage';
import BrushIcon from '@material-ui/icons/Brush';
import DevicesIcon from '@material-ui/icons/Devices';

export const getIconForSkillset = skillset => {
  switch (skillset) {
    case 'Front-end Developer':
      return <DevicesIcon />;
    case 'Back-end Developer':
      return <StorageIcon />;
    case 'Designer':
      return <BrushIcon />;
    default:
      return null;
  }
};
