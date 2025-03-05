// src/ProgressLine.js
import { useEffect, useState } from 'react';
import './ProgressLine.css';
// Create this CSS file for styles




const ProgressLine = ({ event, value }) => {
  let [popup, setPopup] = useState({ visible: false, value: 0 });

  useEffect(() => {
    if (value <= 100 && value > 0) {
      setPopup(popup = { visible: true, value: value })
    }
  }, [value])


  return (
    <div className="progress-line">
      <div className="marker" style={{ left: '0%' }}>0</div>
      <div className="marker" style={{ left: '25%' }}>25</div>
      <div className="marker" style={{ left: '50%' }}>50</div>
      <div className="marker" style={{ left: '75%' }}>75</div>
      <div className="marker" style={{ left: '100%' }}>100</div>
      {
        popup.visible && (
          <div className="popup" style={{ left: `${popup.value}%` }}>
            {popup.value}
          </div>
        )}
    </div>
  );
};

export default ProgressLine;