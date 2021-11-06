import React from 'react';
import loading from 'assets/images/printerous-loading.gif';

const Preloader = () => (
  <div className="preloader">
    <img src={loading} alt="Loading" />
  </div>
);

export default Preloader;
