import { useState } from 'react';
import Link from 'next/link';
import MainNavigation from '@components/layout/MainNavigation'
import Stopwatch from '@components/Stopwatch'
import BarChart from '@components/BarChart';


export default function App() {
  const [times, setTimes] = useState([0, 0, 0]);

  const handleStop = (index) => (timePassed) => {
    setTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      updatedTimes[index] = timePassed;
      return updatedTimes;
    });
  };

  return (
    <div>
      <Stopwatch title={'schoolwork'} onStop={handleStop(0)} />
      <Stopwatch title={'housework'} onStop={handleStop(1)} />
      <Stopwatch title={'schoolwork'} onStop={handleStop(2)} />

      <div className="mt-5">
        <h3>Time Summary</h3>
        <BarChart data={times} />
      </div>
    </div>
  );
}



// export default function App() {
//   return (
//     <div className="container p-3 vh-100">
//       <button className="btn btn-primary m-3">Sling Academy</button>
//       <button className="btn btn-warning m-3">Hello</button>

//       <div className="dropdown m-3">
//         <button
//           className="btn btn-secondary dropdown-toggle"
//           type="button"
//           data-bs-toggle="dropdown"
//           id="dropdownMenuButton1"
//           aria-expanded="false"
//         >
//           Dropdown button
//         </button>
//         <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
//           <li>
//             <a className="dropdown-item" href="#">
//               Option 1
//             </a>
//           </li>
//           <li>
//             <a className="dropdown-item" href="#">
//               Option 2
//             </a>
//           </li>
//           <li>
//             <a className="dropdown-item" href="#">
//               Option 3
//             </a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }
