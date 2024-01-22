import express from 'express';
import mongoose from 'mongoose';

import { DB_URI } from './config';
import { errorHandler, routeNotFound } from './middleware/errorHandler';
import { createCustomers } from './server';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use([routeNotFound, errorHandler]);

app.listen(4000, () => {
  console.table({ name: '' });
  createCustomers();
  mongoose
    .connect(DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));
});
