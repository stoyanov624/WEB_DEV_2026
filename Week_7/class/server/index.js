const express = require('express');
const cors = require('cors');

// import express from 'express';
const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(req.headers);
  console.log('Keep yourself positive. Always');
  next();
});

app.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
