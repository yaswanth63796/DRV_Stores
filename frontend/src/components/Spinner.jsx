import React from 'react';
import '../styles/Spinner.css';

const Spinner = ({ inline = false }) => {
  if (inline) {
    return <span className="spinner-inline"></span>;
  }
  
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;