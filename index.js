const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const route = require('./server/routes/router');
const connectDB = require('./server/database/connection');


dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 8080;


//use morgan
app.use(morgan('tiny'));


//mongoDB connection
connectDB();


//use bodyParser
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());


//set ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//use Route
app.use('/', route);


app.listen(PORT, () => {
    console.log(`Your application is listening on port http://localhost:${PORT}`);
});