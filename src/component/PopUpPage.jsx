import React from "react";
import "./PopUpPage.css";  

const PopUpPage = ({ data, closePopup }) => {
  return (
    <div className="about-popup-overlay">
    <div className="about-popup">
      <div className="popup-header">
        <h2>{data.heading}</h2>
      </div>
      <p>
       {data.content}
      </p>
      <button className="close-btn" onClick={closePopup}>
          Close
        </button>
    </div>
  </div>
  );
};

export default PopUpPage;
