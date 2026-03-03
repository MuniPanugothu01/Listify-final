import React from 'react';
import LoadingSpinner from '../LoadingSpinner.jsx';

const Loader = ({ size = 'medium' }) => {
  return <LoadingSpinner fullScreen={false} size={size} text="" />;
};

export default Loader;
