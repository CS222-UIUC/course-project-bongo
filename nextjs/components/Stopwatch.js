import { useState, useRef, useEffect } from 'react';
import style from "./Stopwatch.module.css";
import { Card, Button } from 'react-bootstrap';

export default function Stopwatch({ title, onStop, onDelete, onTitleChange }) {
  const [timerStart, setTimerStart] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(0);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleStart = () => {
    if (!running) {
      setTimerStart(Date.now());
      setCurrentTime(Date.now());
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setCurrentTime(Date.now());
      }, 10);
    }
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    onStop(timePassed);
  };

  let timePassed = Math.trunc((currentTime - timerStart) / 1000);

  let timePassed_min = Math.trunc(timePassed / 60).toString().padStart(2, '0');
  let timePassed_sec = (timePassed % 60).toString().padStart(2, '0');

  const handleTitleChange = (event) => {
    onTitleChange(event.target.value);
  };

  return (
    <Card className={`${style.stopwatchCard} mb-3`}>
      <Card.Body>
        <input
          className={`${style.title} mb-3`}
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <h2>{timePassed_min}:{timePassed_sec}</h2>
        <div>
          {!running && (
            <Button variant="success" className="me-2" onClick={handleStart}>
              Start
            </Button>
          )}
          {running && (
            <Button variant="warning" className="me-2" onClick={handleStop}>
              Stop
            </Button>
          )}
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

}