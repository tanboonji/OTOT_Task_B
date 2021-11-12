import './App.css';
import { useState, useEffect } from 'react';
import { Button, Card, InputGroup, FormControl } from 'react-bootstrap';
import { getAllCustomer, getCustomer, createCustomer, updateCustomer, deleteCustomer } from './Api';

function App() {
  const [response, setResponse] = useState('');
  const [result, setResult] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (response) {
      if (Array.isArray(response)) {
        var result = "";
        for (let i = 0; i < response.length; i++) {
          if (i !== 0) {
            result += ", ";
          }
          result += "(" + response[i].id + " - " + response[i].email + " - " + response[i].name + ")";
        }
        setResult(result);
      } else {
        setResult(response);
      }
    }
  }, [response])

  async function clickGetAllCustomer() {
    const res = await getAllCustomer();
    setResponse(res.data);
  }

  async function clickGetCustomer(id) {
    try {
      const res = await getCustomer(id);
      setResponse(res.data);
    } catch (err) {
      setResponse("Error when getting customer. Please check if you have entered a valid customer id.");
    }
  }

  async function clickCreateCustomer(id, email, name) {
    try {
      const res = await createCustomer(id, email, name);
      setResponse(res.data);
    } catch (err) {
      setResponse("Error when creating customer. Please check if you have entered a valid customer id, email and name.");
    }
  }

  async function clickUpdateCustomer(id, email, name) {
    try {
      const res = await updateCustomer(id, email, name);
      setResponse(res.data);
    } catch (err) {
      setResponse("Error when updating customer. Please check if you have entered a valid customer id, email and name.");
    }
  }

  async function clickDeleteCustomer(id) {
    try {
      const res = await deleteCustomer(id);
      setResponse(res.data);
    } catch (err) {
      setResponse("Error when deleting customer. Please check if you have entered a valid customer id.");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>OTOT Task B4</h2>

        <h3>Request</h3>
        <InputGroup className="mb-3" style={{ "width": "40vw" }}>
          <InputGroup.Text id="basic-addon1" style={{ "min-width": "70px" }}>id</InputGroup.Text>
          <FormControl
            placeholder="Customer ID"
            onChange={(e) => setId(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3" style={{ "width": "40vw" }}>
          <InputGroup.Text id="basic-addon1" style={{ "min-width": "70px" }}>email</InputGroup.Text>
          <FormControl
            placeholder="Customer Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3" style={{ "width": "40vw" }}>
          <InputGroup.Text id="basic-addon1" style={{ "min-width": "70px" }}>name</InputGroup.Text>
          <FormControl
            placeholder="Customer Name"
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>

        <div className="d-flex">
          <Button variant="success" className={"m-3"} onClick={() => clickGetAllCustomer()}>Get all customer details</Button>
          <Button variant="success" className={"m-3"} onClick={() => clickGetCustomer(id)}>Get customer by id</Button>
          <Button variant="success" className={"m-3"} onClick={() => clickCreateCustomer(id, email, name)}>Create new customer</Button>
          <Button variant="warning" className={"m-3"} onClick={() => clickUpdateCustomer(id, email, name)}>Update customer details</Button>
          <Button variant="danger" className={"m-3"} onClick={() => clickDeleteCustomer(id)}>Delete customer</Button>
        </div>
      
        <Card style={{ "color": "black", "width": "40vw", "height": "10vw" }} className="m-3">
          <Card.Header className="h3">Response</Card.Header>
          <Card.Body>
            <Card.Text style={{ "font-size": "15px" }}>{result}</Card.Text>
          </Card.Body>
        </Card>
      </header>
    </div>
  );
}

export default App;
