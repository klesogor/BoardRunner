const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');


const bootstrap = require('./bootstrap');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

bootstrap(process.env).then(
    ([_connection, port]) =>  {
        console.log(`Started server on port: ${port}`)
        http.createServer(app).listen(port);
    }
)

module.exports = app;
