import { pool } from '../db/db.js';

const items = [
  { id: 1, name: 'Item_1', description: 'Item_1_Description' },
  { id: 2, name: 'Item_1', description: 'Item_1_Description' },
  { id: 3, name: 'Item_1', description: 'Item_1_Description' },
  { id: 4, name: 'Item_1', description: 'Item_1_Description' },
  { id: 5, name: 'Item_1', description: 'Item_1_Description' },
  { id: 6, name: 'Item_1', description: 'Item_1_Description' },
  { id: 7, name: 'Item_1', description: 'Item_1_Description' },
  { id: 8, name: 'Item_1', description: 'Item_1_Description' },
  { id: 9, name: 'Item_1', description: 'Item_1_Description' },
  { id: 10, name: 'Item_1', description: 'Item_1_Description' },
];

export const getItems = async (req, res) => {
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 10;
  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;
  // const paginatedItems = items.slice(startIndex, endIndex);
  // res
  //   .status(200)
  //   .json({
  //     page,
  //     limit,
  //     totalItems: items.length,
  //     totalPages: Math.ceil(items.length / limit),
  //     data: paginatedItems,
  //   });
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const dataQuery = `
      SELECT * FROM items
      ORDER BY id
      LIMIT $1 OFFSET $2
    `;

    const countQuery = `SELECT COUNT(*) FROM items`;

    const [dataResult, countResult] = await Promise.all([
      pool.query(dataQuery, [limit, offset]),
      pool.query(countQuery),
    ]);

    const totalItems = Number(countResult.rows[0].count);

    res.status(200).json({
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      data: dataResult.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createItem = async (req, res) => {
  const { name, description } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (
    !description ||
    typeof description !== 'string' ||
    description.trim() === ''
  ) {
    return res.status(400).json({ message: 'Description is required' });
  }

  try {
    const query = `
      INSERT INTO items (name, description)
      VALUES ($1, $2)
      RETURNING *
    `;

    const result = await pool.query(query, [name.trim(), description.trim()]);

    res.status(201).json({
      message: 'Item created',
      item: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  // const lastItem = items[items.length - 1];
  // const newId = lastItem ? lastItem.id + 1 : 1;

  // const newItem = {
  //   id: newId,
  //   name: name.trim(),
  //   description: description.trim(),
  // };

  // items.push(newItem);
  // res.status(201).json('Item created');
};

export const getItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`SELECT * FROM items WHERE id = $1`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // const item = items.find((item) => item.id === Number(id));

  // if (!item) {
  //   return res.status(404).json({ message: 'Item not found' });
  // }

  // res.status(200).json(item);
};

export const deleteItemById = (req, res) => {
  const { id } = req.params;

  const index = items.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  const deletedItem = items.splice(index, 1);

  res.status(200).json({
    message: 'Item deleted',
    item: deletedItem[0],
  });
};
