const chai = require('chai');
const chaiHttp = require('chai-http');
const Server = require('../models/server');
const server = new Server();

chai.should();
chai.use(chaiHttp);

describe('API tasks', () => {

    describe('GET /upload', () => {
        it('It should send a 200 status', (done) => {
            chai
                .request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });
    });

    describe('GET /wrong-path', () => {
        it('It should send a 404 status', (done) => {
            chai
                .request(server)
                .get('/wrong-path')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        });
    });

});