import { useState, useRef } from 'react';
import style from "./Stopwatch.module.css";
import Button from 'react-bootstrap/Button';

export default function Stopwatch({ title, onStop }) {
  const [time, setTime] = useState(0);
  const [now, setNow] = useState(0);
  // added so that the timer doesn't become unstoppable after clicking start twice
  const [running, setRunning] = useState(false); // Add running state
  
  const intervalRef = useRef(0);

  const handleStart = () => {
    if (!running) { // Check if the timer is not running
      setTime(Date.now());
      setNow(Date.now());
      setRunning(true); // Set running state to true
      // stores the repeated interval reference/ID
      intervalRef.current = setInterval(() => {
        setTime(Date.now());
      }, 10);
    }
  };
  
  const handleStop = () => {
    // clears the repeated interval reference/ID
    clearInterval(intervalRef.current);
    setRunning(false); // Set running state to false
    onStop(timePassed); // Call the onStop callback with the time passed
  };

  

  let timePassed = Math.trunc((time - now) / 1000);

  let timePassed_min = Math.trunc(timePassed / 60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  
  let timePassed_sec = (timePassed - 60*timePassed_min).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  return (
    <div className='Stopwatch'>
      <h1 className={style.title}>{title}</h1>
      <h2>{timePassed_min}:{timePassed_sec}</h2>
      <div>
        <Button variant="success" onClick={handleStart}>Start</Button>
        <Button variant="warning" onClick={handleStop}>Stop</Button>
      </div>
    
      
    
    
    </div>
    
  )
}