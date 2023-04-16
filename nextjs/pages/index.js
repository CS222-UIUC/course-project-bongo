import { useState } from 'react';
import BarChart from '@components/BarChart';
import Stopwatch from '@components/Stopwatch';
import { Button } from 'react-bootstrap';

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { title: `Task ${prevTasks.length + 1}`, time: 0 },
    ]);
  };

  const deleteTask = (index) => () => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const handleStop = (index) => (timePassed) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].time = timePassed/60;
      return updatedTasks;
    });
  };

  const handleTitleChange = (index) => (newTitle) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].title = newTitle;
      return updatedTasks;
    });
  };

  const handleSave = () => {
    setTasks((prevTasks) => []);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {tasks.map((task, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Stopwatch
              title={task.title}
              onStop={handleStop(index)}
              onDelete={deleteTask(index)}
              onTitleChange={handleTitleChange(index)}
            />
          </div>
        ))}
        <div className="col-12">
          <Button variant="info" className="btn btn-purple mb-5" onClick={addTask}>
            Add Task
          </Button>
          <Button variant="secondary" className="btn btn-purple mb-5" style ={{float: 'right'}} onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
      <div className="mt-5">
        <h3>Time Summary</h3>
        <BarChart
          data={tasks.map((task) => task.time)}
          labels={tasks.map((task) => task.title)}
        />
      </div>
    </div>
  );


  
}
