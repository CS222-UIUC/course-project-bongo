import { useState, useEffect, useContext } from 'react';
import BarChart from '@components/BarChart';
import Stopwatch from '@components/Stopwatch';
import { Button } from 'react-bootstrap';
import UserContext from '../contexts/UserContext';
import Logos from '@components/Logos';
import PieChart from '@components/PieChart';


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  if (!user) {
    return <div>Please log in to continue.</div>;
  }

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${user.userId}`);
      const data = await response.json();
      console.log(data);
      setTasks(data);
      setIsLoading(false); // set isLoading to false after fetching data
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setIsLoading(false); // set isLoading to false if there's an error
    }
  };

  // render a loading message if the data is still being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

const addTask = async () => {
  if (!user) {
    console.error('User is not defined');
    return;
  }

  const newTask = { 
    user_id: user.userId,
    title: `Task ${tasks.length + 1}`, 
    time_milliseconds: 0,
    created_at: new Date().toISOString(),
   };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${user.userId}`, {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setTasks((prevTasks) => [
      ...prevTasks,
      data,
    ]);
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

const deleteTask = (taskId) => async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
    console.log("taskId: ", taskId);
    console.log("tasks: ", tasks.id);

    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));

  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

const handleStop = (taskId) => async (timePassed) => {
  console.log("taskId: ", taskId);
  console.log("timePassed: ", timePassed);
  console.log(tasks);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  const timeMilliseconds = timePassed; // Convert seconds to milliseconds


  try {
    // update task in database
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ title: tasks[taskIndex].title, time_milliseconds: timeMilliseconds }), // Change this to time_milliseconds
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const taskIndex = updatedTasks.findIndex((task) => task.id === taskId);
      updatedTasks[taskIndex].time_milliseconds = timeMilliseconds; // Change this to time_milliseconds
      return updatedTasks;
    });
  } catch (error) {
    console.error('Error updating task time:', error);
  }
};


const handleTitleChange = (taskId) => async (newTitle) => {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  const currentTimeMilliseconds = tasks[taskIndex].time_milliseconds; // Change this to time_milliseconds

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ title: newTitle, time_milliseconds: currentTimeMilliseconds }), // Change this to time_milliseconds
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[taskIndex].title = newTitle;
      return updatedTasks;
    });
  } catch (error) {
    console.error('Error updating task title:', error);
  }
};



return (
  <div className="container mt-5">
    <Logos />
    <div className="mt-5">
      <h3>Total Time Spent</h3>
      <div className="row">
        <div className="col-md-6">
          <BarChart
            key={tasks.length}
            data={Array.isArray(tasks) ? tasks.map((task) => task.time_milliseconds / 1000) : []}
            labels={Array.isArray(tasks) ? tasks.map((task) => task.title) : []}
          />
        </div>
        <div className="col-md-6">
          <PieChart
            data={Array.isArray(tasks) ? tasks.map((task) => task.time_milliseconds / 1000) : []}
            labels={Array.isArray(tasks) ? tasks.map((task) => task.title) : []}
          />
        </div>
      </div>
      
    </div>
    <div className="col-12">
      <Button variant="info" className="btn btn-purple mb-5" onClick={addTask}>
        Add Task
      </Button>
    </div>
    <div className="row">
      {Array.isArray(tasks) &&
        tasks.map((task, index) => (
          <div key={task.id} className="col-md-4 mb-4">
            <Stopwatch
              title={task.title}
              onStop={handleStop(task.id)}
              onDelete={deleteTask(task.id)}
              onTitleChange={handleTitleChange(task.id)}
              startTime={task.time_milliseconds} // Change this to time_milliseconds
            />
          </div>
        ))}
    </div>
  </div>
);




  
}
