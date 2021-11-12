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

const getAllCustomer = (req, res) => {
  pool.query("SELECT * FROM Customer ORDER BY id ASC", (error, results) => {
    if (error) {
      res.status(500).send(error);
    }
    res.status(200).json(results.rows);
  });
};

const getCustomer = (req, res) => {
  let id;
  try {
    id = parseInt(req.params.id);
  } catch (error) {
    res.status(500).send(error);
  }

  pool.query("SELECT * FROM Customer WHERE id = $1", [id], (error, results) => {
    if (error) {
      res.status(500).send(error);
    }
    res.status(200).json(results.rows);
  });
};

const createCustomer = (req, res) => {
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

  pool.query("INSERT INTO Customer (id, name, email) VALUES ($1, $2, $3)", [id, name, email], (error, results) => {
    if (error) {
      res.status(500).send(error);
    }
    res.status(200).send("OK");
  });
};

const updateCustomer = (req, res) => {
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

  pool.query("UPDATE Customer SET name = $1, email = $2 WHERE id = $3", [name, email, id], (error, results) => {
      if (error) {
        res.status(500).send(error);
      }
      res.status(200).send("OK");
    }
  );
};

const deleteCustomer = (req, res) => {
  let id;
  try {
      id = parseInt(req.params.id);
  } catch (error) {
    res.status(500).send(error);
  }

  pool.query("DELETE FROM Customer WHERE id = $1", [id], (error, results) => {
    if (error) {
      res.status(500).send(error);
    }
    res.status(200).send("OK");
  });
};

module.exports = {
  getCustomer,
  getAllCustomer,
  deleteCustomer,
  createCustomer,
  updateCustomer,
};
