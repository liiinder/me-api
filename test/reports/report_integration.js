process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
let token = "";

chai.should();

chai.use(chaiHttp);

describe('Reports', () => {
    describe('GET /reports/week/41 not in db', () => {
        it('400 BAD PATH', (done) => {
            chai.request(server)
                .get("/reports/week/41")
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.data.msg.should.be.an("string");

                    done();
                });
        });
    });

    describe('GET /reports/week/2', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/2")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    // res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });

    describe('POST /register', () => {
        it('test register a user correct', (done) => {
            const body = {
                password: "qwerqwer",
                email: "portal@testing.com",
                birth: "990919",
                name: "Glados"
            };

            chai.request(server)
                .post("/register")
                .send(body)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    done();
                });
        });

        it('test register a user faulty', (done) => {
            const body = {
                email: "a@b.c"
            };

            chai.request(server)
                .post("/register")
                .send(body)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('test register a already registered email', (done) => {
            const body = {
                password: "12341234",
                email: "portal@testing.com"
            };

            chai.request(server)
                .post("/register")
                .send(body)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('POST /login', () => {
        it('test login with a correct user', (done) => {
            let user = {
                password: "qwerqwer",
                email: "portal@testing.com",
            };
    
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    token = res.body.data.token;
                    done();
                })
        });

        it('test login with wrong password', (done) => {
            let user = {
                password: "12341234",
                email: "portal@testing.com"
            };

            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('test login with wrong email', (done) => {
            let user = {
                password: "12341234",
                email: "test@bth.se"
            };

            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("GET /", () => {
        it('test so the / route returns a object', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('desc');

                    done();
                });
        });
    });

    describe("POST /reports", () => {
        const body = {
            report: "Testing testing",
            week: "10"
        };
        it('test to update a report', (done) => {
            chai.request(server)
                .post("/reports")
                .set('x-access-token', token)
                .send(body)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });

        it('test to update a report without content', (done) => {
            chai.request(server)
                .post("/reports")
                .set('x-access-token', token)
                .send("")
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Test to update with an invalid token', (done) => {
            chai.request(server)
                .post("/reports")
                .set('x-access-token', "failedToken")
                .send(body)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.data.msg.should.equal("Invalid Token");
                    done();
                })
        });
    });

    describe("GET /404", () => {
        it('test to check unknown routes', (done) => {
            chai.request(server)
                .get("/404")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});

