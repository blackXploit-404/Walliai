// src/components/LoadingSpinner.js
import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
  return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
};

export default LoadingSpinner;
