import React from 'react';
import './Popup.scss';

const Popup = () => (
  <div id="popup" className="ol-popup">
    <div id="popup-closer" className="ol-popup-closer" />
    <div id="popup-content" />
  </div>
);

export default Popup;
