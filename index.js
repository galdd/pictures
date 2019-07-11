// load libary
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// init utils
const {getPicture,getPictures, addPictures, editPictures, removePictures, getFilename} = require('./utils/pictures');
const port = 2000;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client

// routes for the app
app.get('/pictures', getPictures);
app.post('/pictures', addPictures);
app.get('/pictures/:id', getPicture);
app.patch('/pictures/:id', editPictures);
app.delete('/pictures/:id', removePictures);
app.get('/serve/filename', getFilename);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});