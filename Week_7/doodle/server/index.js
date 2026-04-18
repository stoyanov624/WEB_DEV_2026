// const express = require('express');
// const cors = require('cors');

import express from 'express';
import cors from 'cors';
import itemRouter from './routes/itemRouter.js';
const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('Keep Yourself Positive. Always');
  next();
});

// const itemRouter = require('./routes/itemRouter');
app.use('/items', itemRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
