const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const MONGOURL = process.env.MONGOURL ||"mongodb://127.0.0.1:27017/bloging";
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.json());

app.use(["/user", "/users"], userRouter);
app.use(["/post", "/posts"], postRouter);

mongoose.connect(MONGOURL, (err) => {
  if (!err) return console.log("database connected");
  console.log(err);
});
app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});

