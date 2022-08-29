const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
// app.use(express.static('client/build'));
const uri = 'mongodb+srv://rtwele:password1234@cluster0.bl29a.mongodb.net/?retryWrites=true&w=majority';
        
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
const connection = mongoose.connection;

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
// }

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');  
const usersRouter = require('./routes/users');  
    
app.use('/exercises', exercisesRouter);  
app.use('/users', usersRouter);
// app.use(express.static(path.join(__dirname, '../build')));

app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});