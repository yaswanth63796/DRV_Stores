import React from 'react';

// Temporarily allow all routes to be accessible without authentication.
// Revert this when you want to enforce auth again.
const PrivateRoute = ({ children }) => {
  return children;
};

export default PrivateRoute;