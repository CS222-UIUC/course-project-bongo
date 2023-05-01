import React from "react";
import { Button } from 'react-bootstrap';
import style from "./Popup.module.css";
export const Popup = ({ text, yesPopup, noPopup }) => {
  return (
    <div className="popup-container">
     <div className="popup-body">
      <h1>{text}</h1>
      <Button variant="info" className = {`${style.button1} mb-3`} onClick={yesPopup}>Yes</Button>
      <Button variant="info" className = {`${style.button2} mb-3`} onClick={noPopup}>No</Button>
     </div>
    </div>
  );
};