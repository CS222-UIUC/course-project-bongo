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
      <h1 className={style.title}>Start recording time</h1>
      <h2>{timePassed_min}:{timePassed_sec}</h2>
      <div>
        <Button variant="success" onClick={handleStart}>Start</Button>
        <Button variant="warning" onClick={handleStop}>Stop</Button>
      </div>
    </div>
  )
}