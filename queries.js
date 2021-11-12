const Pool = require("pg").Pool;
const asyncHandler = require("express-async-handler");
var pool;

if (process.env.POSTGRES_URL) {
  const connectionString = process.env.POSTGRES_URL;

  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });
} else {
  pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
  });
}

const ERROR_NO_DATA = "Bad Request. No data provided.";
const ERROR_NO_ID = "Bad Request. No id provided.";
const ERROR_NO_NAME = "Bad Request. No name provided.";
const ERROR_NO_EMAIL = "Bad Request. No email provided.";

const getAllCustomer = asyncHandler(async (req, res) => {
  pool.query("SELECT * FROM Customer ORDER BY id ASC")
    .then(result => { res.status(200).json(result.rows); })
    .catch(error => { res.status(500).send(error) });
});

const getCustomer = asyncHandler(async (req, res) => {
  let id;
  try {
    id = parseInt(req.params.id);
  } catch (error) {
    res.status(500).send(error);
  }
  await pool.query("SELECT * FROM Customer WHERE id = $1", [id])
    .then(result => { res.status(200).json(result.rows); })
    .catch(error => { res.status(500).send(error); });
});

const createCustomer = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(401).send(ERROR_NO_DATA);
  }

  const { id, name, email } = req.body;
  if (!id) {
    return res.status(401).send(ERROR_NO_ID);
  }
  if (!name) {
    return res.status(401).send(ERROR_NO_NAME);
  }
  if (!email) {
    return res.status(401).send(ERROR_NO_EMAIL);
  }

  await pool.query("INSERT INTO Customer (id, name, email) VALUES ($1, $2, $3)", [id, name, email])
    .then(result => { res.status(200).send("OK"); })
    .catch(error => { res.status(500).send(error); });
});

const updateCustomer = asyncHandler(async (req, res) => {
  let id;
  try {
    id = parseInt(req.params.id);
  } catch (error) {
    res.status(500).send(error);
  }

  if (!req.body) {
    res.status(401).send(ERROR_NO_DATA);
  }

  const { name, email } = req.body;
  if (!name) {
    return res.status(401).send(ERROR_NO_NAME);
  }
  if (!email) {
    return res.status(401).send(ERROR_NO_EMAIL);
  }

  await pool.query("UPDATE Customer SET name = $1, email = $2 WHERE id = $3", [name, email, id])
    .then(result => { res.status(200).send("OK"); })
    .catch(error => { res.status(500).send(error); });
});

const deleteCustomer = asyncHandler(async (req, res) => {
  let id;
  try {
      id = parseInt(req.params.id);
  } catch (error) {
    res.status(500).send(error);
  }

  pool.query("DELETE FROM Customer WHERE id = $1", [id])
  .then(result => { res.status(200).send("OK"); })
  .catch(error => { res.status(500).send(error); });
});

module.exports = {
  getCustomer,
  getAllCustomer,
  deleteCustomer,
  createCustomer,
  updateCustomer,
};
