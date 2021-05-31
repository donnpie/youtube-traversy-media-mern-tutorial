//Traversy Media Tutorial server.js

const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');

//Router for API
const items = require('./routes/api/Items');

const app = express();

//Body parser middleware
//app.use(bodyParser.json());
app.use(express.json());

//Connect to local mongo
// mongoose.connect('mongodb://localhost/playground')
//     .then(() => console.log('MongoDb local db connected...'))
//     .catch(err => console.error("Could not connect to mongoDB", err));

//Connect to remote mongo
const db = require('./config/keys').mongoUri;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log('MongoDb remote connected...'))
    .catch(err => console.log(err));

//Use routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));