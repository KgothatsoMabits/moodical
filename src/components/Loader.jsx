import React from 'react';
import '../styles/global.css';

export default function Loader({ small = false }) {
  const sizeClass = small ? 'loader-small' : 'loader-large';

  return (
    <div className="loader-container">
      <div className={`loader-spinner ${sizeClass}`} />
    </div>
  );
}
