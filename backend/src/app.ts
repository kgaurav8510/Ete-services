import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRouter from './routes/user.route';


dotenv.config();
const app = express();

app.use(morgan('dev'));

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cors({ origin: '*' }),
  express.static('assets'),
  bodyParser.json()
);

app.use('/api/user', userRouter);


app.get('/', async function (req, res) {
  return res.send(`Server is running at ${req.protocol + '://' + req.hostname + ':' + process.env.PORT} `);
});

export default app;
