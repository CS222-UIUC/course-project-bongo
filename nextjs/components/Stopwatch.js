import { useState, useRef, useEffect } from 'react';
import style from "./Stopwatch.module.css";
import { Card, Button } from 'react-bootstrap';

// export default function Stopwatch({ title, onStop, onDelete, onTitleChange }) {
//   const [timerStart, setTimerStart] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [running, setRunning] = useState(false);

//   const intervalRef = useRef(0);

//   useEffect(() => {
//     return () => {
//       clearInterval(intervalRef.current);
//     };
//   }, []);

//   const handleStart = () => {
//     if (!running) {
//       setTimerStart(Date.now());
//       setCurrentTime(Date.now());
//       setRunning(true);
//       intervalRef.current = setInterval(() => {
//         setCurrentTime(Date.now());
//       }, 10);
//     }
//   };

//   const handleStop = () => {
//     clearInterval(intervalRef.current);
//     setRunning(false);
//     onStop(timePassed);
//   };

//   let timePassed = Math.trunc((currentTime - timerStart) / 1000);

//   let timePassed_min = Math.trunc(timePassed / 60).toString().padStart(2, '0');
//   let timePassed_sec = (timePassed % 60).toString().padStart(2, '0');

//   const handleTitleChange = (event) => {
//     onTitleChange(event.target.value);
//   };

//   return (
//     <Card className={`${style.stopwatchCard} mb-3`}>
//       <Card.Body>
//         <input
//           className={`${style.title} mb-3`}
//           type="text"
//           value={title}
//           onChange={handleTitleChange}
//         />
//         <h2>{timePassed_min}:{timePassed_sec}</h2>
//         <div>
//           {!running && (
//             <Button variant="success" className="me-2" onClick={handleStart}>
//               Start
//             </Button>
//           )}
//           {running && (
//             <Button variant="warning" className="me-2" onClick={handleStop}>
//               Stop
//             </Button>
//           )}
//           <Button variant="danger" onClick={onDelete}>
//             Delete
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );

// }



export default function Stopwatch({ title, onStop, onDelete, onTitleChange }) {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStartPause = () => {
    if (isActive) {
      onStop(timePassed);
    }
    setIsActive(!isActive);
  };

  // const handleReset = () => {
  //   onStop(timePassed);
  //   setTime(0);
  //   setIsActive(false);
  // };

  let timePassed = time;

  let timePassed_min = Math.trunc(time / 60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

  let timePassed_sec = (time - 60*timePassed_min).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });

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
        <h2 className={`${style.time} mb-3`}>{timePassed_min}:{timePassed_sec}</h2>
        <div>
          <Button variant="success" onClick={handleStartPause} className="me-2">
            {isActive ? 'Pause' : (time ? 'Resume' : 'Start')}
          </Button>
          {/* <Button variant="warning" onClick={handleReset} className="me-2">
            Reset
          </Button> */}
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}