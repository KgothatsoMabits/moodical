import React from 'react';
import '../styles/global.css';

export default function Loader({ small = false, message = '' }) {
  const sizeClass = small ? 'loader-small' : 'loader-large';

  return (
    <div className="loader-container">
      {/* This new wrapper helps align the spinner and the message vertically */}
      <div className="loader-content-wrapper">
        <div className={`loader-spinner ${sizeClass}`} />
        {message && <p className="loader-message">{message}</p>}
      </div>
    </div>
  );
}