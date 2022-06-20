const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe("/GET testing API ", () => {
  // index api test
  it("it should GET index page", () => {
    chai
      .request(app)
      .get("/indexRoute")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  // test for register api
  it("it should GET register page", () => {
    chai
      .request(app)
      .get("/registerRoute")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  // test for about api
  it("it should GET about page", () => {
    chai
      .request(app)
      .get("/aboutRoute")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

});
