const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5003;

const db = require('./queries');

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/getAllCustomer', db.getAllCustomer);
app.get('/getCustomer/:id', db.getCustomer);
app.post('/createCustomer', db.createCustomer);
app.put('/updateCustomer/:id', db.updateCustomer);
app.delete('/deleteCustomer/:id', db.deleteCustomer);

app.listen(port, () => {
  console.log(`Started server on port: ${port}.`);
});

module.exports = app;
