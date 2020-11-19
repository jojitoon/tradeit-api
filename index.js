import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger, mongooseOptions } from './constants';
import router from './routes';

dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_URI, mongooseOptions)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error connecting to database'));

app.use('/api/', router);

app.get('/*', (req, res) => {
  res.status(400).json({
    message: 'Invalid URL',
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log('connected to the server', process.env.PORT || 5000);
});
