import { useState, useRef } from 'react';
import style from "./Stopwatch.module.css";
import Button from 'react-bootstrap/Button';
export default function Stopwatch(props) {
  const [time, setTime] = useState(0);
  const [now, setNow] = useState(0);
  
  const intervalRef = useRef(0);

  const handleStart = () => {
    setTime(Date.now());
    setNow(Date.now());
    intervalRef.current = setInterval(() => {
      setTime(Date.now());
    }, 10);
  };
  
  const handleStop = () => {
    clearInterval(intervalRef.current);
  };

  let timePassed = (time - now) / 1000;

  return (
    <div className='Stopwatch'>
      <h1>Start recording time</h1>
      <h2>{timePassed.toFixed(1)}</h2>
      <div>
        <Button variant="success" onClick={handleStart}>Start</Button>
        <Button variant="warning" onClick={handleStop}>Stop</Button>
      </div>
    </div>
  )
}