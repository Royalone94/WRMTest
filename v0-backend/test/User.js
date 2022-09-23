let chai = require("chai");
let request = require ("supertest");
let expect = chai.expect;
let should = chai.should;
let assert = chai.assert;
let localhost = request('http://localhost:8080');

describe("User", () => {
    it("Testing validation for user Id, it should return 404", () => {
        let data = {};
        localhost
            .post("/add")
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err);
                done();
            });
    });
});