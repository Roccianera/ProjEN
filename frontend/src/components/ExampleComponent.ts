import React from 'react';
import { useTheme } from '@mui/material/styles';

const ExampleComponent = () => {
  const theme = useTheme();
  console.log(theme.spacing(2)); // Correct usage of spacing
  return (<div>Example Component</div>);
};

export default ExampleComponent;
