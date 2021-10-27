require('dotenv').config();
require('express-async-errors');
const cors=require('cors')
const sendGridEmail = require('./controllers/sendEmail');
const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// app.use(cors())
// routes
app.get('/',cors(), (req, res) => {

  res.send(`<h1>Email Project</h1> <a href="/send">send email</a>`);
});

app.use('/send', sendGridEmail);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${ port }...`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();
