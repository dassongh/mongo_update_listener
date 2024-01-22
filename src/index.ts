import express from 'express';
import mongoose from 'mongoose';

import { DB_URI } from './config';
import { createCustomers, initListener } from './server';

const app = express();

app.listen(4000, () => {
  console.table({ port: 4000 });
  initListener();
  createCustomers();
  mongoose
    .connect(DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));
});
