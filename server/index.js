const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const jwt = require('jsonwebtoken');



require('dotenv').config();

const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', // Replace this with your frontend origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    const user = result.rows[0];

    if (user) {
      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
      res.status(200).json({ message: 'Logged in successfully', userId: user.id });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});


app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existingUser.rowCount > 0) {
      res.status(409).json({ message: 'Email already exists' });
      return;
    }

    const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
    const user = result.rows[0];

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// fetch tasks
app.get('/api/tasks/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM user_tasks WHERE user_id = $1', [userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// add task
app.post('/api/tasks/:userId', async (req, res) => {
  const { userId } = req.params;
  const { title, time_milliseconds, created_at } = req.body;
  console.log("adding task, with userId: ", userId);

  try {
    const result = await pool.query('INSERT INTO user_tasks (user_id, title, time_milliseconds, created_at) VALUES ($1, $2, $3, $4) RETURNING *', [userId, title, time_milliseconds, created_at]);
    console.log("backend init task: ", result);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// update task on pause
app.put('/api/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { title, time_milliseconds } = req.body;

  try {
    await pool.query('UPDATE user_tasks SET title = $1, time_milliseconds = $2 WHERE id = $3', [title, time_milliseconds, taskId]);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.delete('/api/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;

  try {
    await pool.query('DELETE FROM user_tasks WHERE id = $1', [taskId]);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});











// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3030;

// const bodyParser = require('body-parser');
// app.use(bodyParser.json()); /// omg this is the problem

// require('dotenv').config();


// ///// [ cors setup ] /////
// const cors = require('cors'); // Add this line to import the cors package

// const corsOptions = {
//   origin: '*', // Allow requests from your frontend origin
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
// };

// app.use(cors(corsOptions));


// ///////////[ SQL setup ]///////////
// const mysql = require('mysql2');

// const dbConnection = mysql.createConnection({
//   host: '35.194.20.94',
//   user: 'root',
//   password: 'welcome123',
//   database: 'cs222',
// }); 


// ///// [ Passport setup ] /////
// const session = require('express-session');
// const passport = require('passport');
// require('./passportConfig')(passport);

// app.use(
//   session({
//     secret: 'your-session-secret',
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());



// // Welcome route
// app.route('/')
//   .get((req, res) => {
//     res.json({ message: `Welcome to the root '/'!` });
//   });

// // Data route
// app.route('/api/data')
//   .get((req, res) => {
//     const count = req.query.count || 0;
//     res.json({ message: `${count}` });
//   });

// // ChatGPT route
// app.route('/api/chat')
//   .post(async (req, res) => {
//     try {
//       const messages = req.body.messages;
//       const OPENAI_API_KEY = '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'; // Replace with your OpenAI API key

//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${OPENAI_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           messages: messages,
//         }),
//       });

//       const data = await response.json();
//       const chatResponse = data.choices && data.choices[0] && data.choices[0].message.content;

//       res.json({ response: chatResponse });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error fetching ChatGPT response.' });
//     }
//   });


// app.route('/api/schools/low-crime')
//   .get((req, res) => {
//     const SQL_query = `
//       SELECT sc.Name, sc.State, st.CrimeRate 
//       FROM School sc
//       JOIN State st ON (sc.State=st.Code) 
//       WHERE st.CrimeRate < (
//         SELECT AVG(CrimeRate) 
//         FROM State
//       ) 
//       ORDER BY st.CrimeRate, sc.Name ASC
//       LIMIT 100;
//     `;
//     dbConnection.query(SQL_query, (error, results) => {
//       // console.log(results);
//       if (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching data from the database.' });
//       } else {
//         res.json(results);
//       }
//     });
//   });


//   app.route('/api/schools/high-ratemyprof')
//   .get((req, res) => {
//     const SQL_query = `
//       SELECT sc.Name, AVG(rp.StarRating) as avg_rating 
//       FROM School sc JOIN RateProf rp ON (sc.Name = rp.SchoolName) 
//       GROUP BY rp.SchoolName 
//       ORDER BY avg_rating DESC, sc.Name ASC
//       LIMIT 100;
//     `;
//     dbConnection.query(SQL_query, (error, results) => {
//       // console.log(results);
//       if (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching data from the database.' });
//       } else {
//         res.json(results);
//       }
//     });
//   });


//   // must be different with individual get. 
// app.route('/api/schools')
//   // Get all schools
//   .get((req, res) => {
//     const SQL_query = 'SELECT * FROM School LIMIT 30';
//     dbConnection.query(SQL_query, (error, results) => {
//       // console.log(results);
//       if (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching data from the database.' });
//       } else {
//         res.json(results);
//       }
//     });
//   })
//   // Create a new school
//   .post((req, res) => {
//     const newSchool = req.body;
//     const SQL_query = 'INSERT INTO School SET ?';
//     dbConnection.query(SQL_query, newSchool, (error, results) => {
//       if (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error creating new school.' });
//       } else {
//         res.json({ message: 'New school created.', id: results.insertId });
//       }
//     });
//   });

//   app.route('/api/schools/:name')
//   // Get a specific school by Name
//   .get((req, res) => {
//     const school_name = req.params.name;
//     // console.log(school_name);

//     if (typeof school_name !== 'string') {
//       res.status(400).json({ message: 'Invalid input. Name should be a string.' });
//       return;
//     }

//     const SQL_query = "SELECT * FROM School WHERE Name LIKE CONCAT('%', ?, '%')";
//     // console.log(SQL_query);
//     dbConnection.query(SQL_query, [school_name], (error, results) => {
//       // console.log(results);
//       if (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching data from the database.' });
//       } else if (results.length === 0) {
//         res.status(404).json({ message: `School with name ${school_name} not found.` });
//       } else {
//         res.json(results);
//       }
//     });
//   })


//   // Update a specific school by name
//   .put((req, res) => {
//     const school_name = req.params.name;
//     const updatedSchool = req.body;
//     const SQL_query = 'UPDATE School SET ? WHERE Name = ?';
//     dbConnection.query(SQL_query, [updatedSchool, school_name], (error, results) => {
//       if (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error updating school.' });
//       } else if (results.affectedRows === 0) {
//         res.status(404).json({ message: `School with name "${school_name}" not found.` });
//       } else {
//         res.json({ message: `School with name "${school_name}" updated.` });
//       }
//     });
//   })

//   // Delete a specific school by name
//   .delete((req, res) => {
//     const school_name = req.params.name;
//     const SQL_query = 'DELETE FROM School WHERE Name = ?';
//     dbConnection.query(SQL_query, [school_name], (error, results) => {
//       if (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error deleting school.' });
//       } else if (results.affectedRows === 0) {
//         res.status(404).json({ message: `School with name ${school_name} not found.` });
//       } else {
//         res.json({ message: `School with name ${school_name} deleted.` });
//       }
//     });
//   });



//   app.post('/register', async (req, res) => {
//     // Register a new user.
//     // Hash the password using bcrypt and store the user in the MySQL database.
//   });
  
//   app.post('/login', passport.authenticate('local'), (req, res) => {
//     res.send('Logged in');
//   });
  
//   app.get('/logout', (req, res) => {
//     req.logout();
//     res.send('Logged out');
//   });
  
//   app.post('/tasks', async (req, res) => {
//     // Add a new task to the MySQL database for the logged-in user.
//   });
  
//   app.get('/tasks', async (req, res) => {
//     // Fetch all tasks for the logged-in user from the MySQL database.
//   });
  
//   app.put('/tasks/:id', async (req, res) => {
//     // Update a task in the MySQL database for the logged-in user.
//   });
  
//   app.delete('/tasks/:id', async (req, res) => {
//     // Delete a task from the MySQL database for the logged-in user.
//   });
  

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Node.js server is running on port ${PORT}`);
// });
