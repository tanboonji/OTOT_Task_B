import chai, { expect } from "chai";
import chaiHttp from "chai-http";
const app = require("../index.js");

chai.use(chaiHttp);
chai.should();

describe("Customer", () => {
  describe("(GET) /getAllCustomer", () => {
    it("should get all customers", (done) => {
      chai.request(app)
        .get("/getAllCustomer")
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body[0]).to.have.all.keys("id", "email", "name");
          done();
        });
    });
  });

  describe("(POST) /createCustomer", () => {
    it("should create a customer with customer id 999", (done) => {
      chai.request(app)
        .post("/createCustomer")
        .send({ id: "999", name: "Mocha", email: "mocha@gmail.com" })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("(GET) /getCustomer/:id", () => {
    it("should get customer with customer id 999", (done) => {
      chai.request(app)
        .get("/getCustomer/999")
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body[0]).to.have.all.keys("id", "email", "name");
          done();
        });
    });
  });

  describe("(PUT) /updateCustomer/:id", () => {
    it("should update customer with customer id 999", (done) => {
      chai.request(app)
        .put("/updateCustomer/4")
        .send({ id: "999", name: "Chai", email: "chai@gmail.com" })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("(DELETE) /deleteCustomer/:id", () => {
    it("should delete customer with customer id 999", (done) => {
      chai.request(app)
        .delete("/deleteCustomer/999")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("(GET) /getCustomer/:id", () => {
    it("should get empty customer after deletion", (done) => {
      chai.request(app)
        .get("/getCustomer/999")
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.an('array').that.is.empty;
          done();
        });
    });
  });

  describe("(POST) /createCustomer", () => {
    it("should fail to create a customer without id", (done) => {
      chai.request(app)
        .post("/createCustomer")
        .send({ name: "Mocha", email: "mocha@gmail.com" })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("(POST) /createCustomer", () => {
    it("should fail to create a customer without name", (done) => {
      chai.request(app)
        .post("/createCustomer")
        .send({ id: "4", email: "mocha@gmail.com" })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("(POST) /createCustomer", () => {
    it("should fail to create a customer without email", (done) => {
      chai.request(app)
        .post("/createCustomer")
        .send({ id: "4", name: "Mocha" })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("(PUT) /updateCustomer/:id", () => {
    it("should fail to update customer id 2 without name", (done) => {
      chai.request(app)
        .put("/updateCustomer/2")
        .send({ email: "test@gmail.com" })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe("(PUT) /updateCustomer/:id", () => {
    it("should fail to update customer id 2 without email", (done) => {
      chai.request(app)
        .put("/updateCustomer/2")
        .send({ name: "test" })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
