const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.route');
const exerciseRouter = require('./routes/exercise.route');
require('dotenv').config();


app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/api/users', userRouter);
app.use('/api/users', exerciseRouter);

// Database Connection
mongoose.connect('mongodb+srv://dheeja31:Dreamy@backenddb.ufxm7.mongodb.net/exercise-tracker?retryWrites=true&w=majority&appName=BackendDB')
.then(() => {
  console.log("Connected to the database");
  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  })
})
.catch(() => {
  console.log("Connection failed");
})


