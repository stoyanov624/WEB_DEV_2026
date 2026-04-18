// const { express } = import('express');
import express from 'express';
import {
  getItems,
  createItem,
  getItemById,
  deleteItemById,
} from '../controllers/itemController.js';
// const express = require('express');
const router = express.Router();

// const itemController = require('../controllers/itemController.js');

// Connect routes to controller functions
router.get('/', getItems);
router.post('/', createItem);
router.get('/:id', getItemById);
router.delete('/:id', deleteItemById);

export default router;
