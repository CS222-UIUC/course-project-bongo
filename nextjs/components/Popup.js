import React from "react";
import { Button } from 'react-bootstrap';
export const Popup = ({ text, yesPopup, noPopup }) => {
  return (
    <div className="popup-container">
     <div className="popup-body">
      <h1>{text}</h1>
      <Button variant="info" onClick={yesPopup}>Yes</Button>
      <Button variant="info" onClick={noPopup} style ={{marginLeft: '50px'}}>No</Button>
     </div>
    </div>
  );
};