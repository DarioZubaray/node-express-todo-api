process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const request = require('supertest')

const app = require('../../../index.js')

describe('Todo api', () => {

    const newUSer = {
        name: 'testUser',
        email: 'test@mail.com',
        password: 'asd123'
    }
    let token;

    it('should create a new user', (done) => {
        request(app).post('/api/auth/new')
            .send(newUSer)
            .then((res) => {
                const body = res.body
                expect(body).to.contain.property('ok')
                expect(body.ok).to.equal(true)
                expect(body).to.contain.property('uid')
                expect(body).to.contain.property('name')
                expect(body.name).to.equal(newUSer.name)
                expect(body).to.contain.property('token')
                done()
            })
            .catch((err) => done(err))
    })

    it('should login the given user', (done) => {
        request(app).post('/api/auth')
            .send(newUSer)
            .then((res) => {
                const body = res.body
                token = body.token
                expect(body).to.contain.property('ok')
                expect(body.ok).to.equal(true)
                expect(body).to.contain.property('uid')
                expect(body).to.contain.property('name')
                expect(body.name).to.equal(newUSer.name)
                expect(body).to.contain.property('token')
                done()
            })
            .catch((err) => done(err))
    })

    it('should renew the token', (done) => {
        request(app).get('/api/auth/renew')
            .set({'x-token': token})
            .then((res) => {
                const body = res.body
                expect(body).to.contain.property('ok')
                expect(body.ok).to.equal(true)
                expect(body).to.contain.property('uid')
                expect(body).to.contain.property('name')
                expect(body.name).to.equal(newUSer.name)
                expect(body).to.contain.property('token')
                done()
            })
            .catch((err) => done(err))
    })
})