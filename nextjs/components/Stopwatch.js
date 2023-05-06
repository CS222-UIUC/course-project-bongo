import { useState, useRef, useEffect } from 'react';
import style from "./Stopwatch.module.css";
import { Card, Button } from 'react-bootstrap';


export default function Stopwatch({ title, onStop, onDelete, onTitleChange, startTime }) {
  const [time, setTime] = useState((startTime) || 0);

  const [isActive, setIsActive] = useState(false);
  

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time => time + 1000); // Increment by 1000 to account for milliseconds
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStartPause = () => {
    if (isActive) {
      onStop(time); // Pass time in milliseconds
    } else {
      const startTimeInMilliseconds = startTime;
    }
    setIsActive(!isActive);
  };
  

  let timePassed = time;

  let timePassed_min = Math.trunc(time / 60000).toLocaleString('en-US', { // Convert to minutes
    minimumIntegerDigits: 2,
    useGrouping: false
  });
  
  let timePassed_sec = Math.trunc((time % 60000) / 1000).toLocaleString('en-US', { // Convert to seconds
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  const handleTitleChange = (event) => {
    onTitleChange(event.target.value);
  };

  const handleReset = () => {
    setTime(0);
    if (onStop) {
      onStop(0);
    }
  };
  
  
  // ...
  return (
    <Card className={`${style.stopwatchCard} mb-3`}>
      <Card.Body>
        <input
          className={`${style.title} mb-3`}
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <h2 className={`${style.time} mb-3`}>{timePassed_min}:{timePassed_sec}</h2>
        <div>
          <Button
            variant={isActive ? 'warning' : 'success'}
            onClick={handleStartPause}
            className="btn-sm me-1"
          >
            {isActive ? 'Pause' : time ? 'Resume' : 'Start'}
          </Button>
          <Button
            variant="secondary"
            onClick={handleReset}
            className="btn-sm me-1"
          >
            Reset
          </Button>
          <Button variant="danger" onClick={onDelete} className="btn-sm me-1" >
            X
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
  // ...

}