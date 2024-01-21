import express from 'express';

import RootRouter from './root.router';

import mongoose from 'mongoose';
import { DB_URI } from './config';
import { errorHandler, routeNotFound } from './middleware/errorHandler';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', new RootRouter().router);
app.use([routeNotFound, errorHandler]);

app.listen(4000, () => {
  console.table({ name: '' });
  mongoose
    .connect(DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));
});
