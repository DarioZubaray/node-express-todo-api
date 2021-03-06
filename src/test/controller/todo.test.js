process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const request = require('supertest')
const moment = require('moment')

const app = require('../../../index.js')

describe('Todo api', () => {

    let newTodo = {
        "message": "Test message",
        "finished": false,
        "datetime": moment().format('YYYY-MM-DD hh:mm')
    }

    const newUSer = {
        name: 'todoUser',
        email: 'todo@mail.com',
        password: 'asd123'
    }

    let token;

    before((done) => {
        request(app).post('/api/auth/new')
            .send(newUSer)
            .then((res) => {
                const body = res.body
                token = body.token
                done()
            })
            .catch((err) => done(err))
    })

    it('should create a new todo', (done) => {
        console.log('debe crear un nuevo todo: ', token)
        request(app).post('/api/todo')
            .set({'x-token': token})
            .send(newTodo)
            .then((res) => {
                const body = res.body
                expect(body).to.contain.property('ok')
                expect(body.ok).to.equal(true)
                expect(body).to.contain.property('todo')

                expect(body.todo).to.contain.property('message')
                expect(body.todo.message).to.equal(newTodo.message)

                expect(body.todo).to.contain.property('finished')
                expect(body.todo.finished).to.equal(newTodo.finished)

                expect(body.todo).to.contain.property('datetime')

                expect(body.todo).to.contain.property('id')
                newTodo.id = body.todo.id
                done()
            })
            .catch((err) => done(err))
    })

    it('shouldn\'t created a new todo when the request body is empty', (done) => {
        request(app).post('/api/todo')
            .set({'x-token': token})
            .then((res) => {
                const body = res.body
                expect(body).to.contain.property('ok')
                expect(body.ok).to.equal(false)
                expect(body).to.contain.property('errors')

                expect(body.errors).to.contain.property('message')
                expect(body.errors.message).to.contain.property('msg')
                expect(body.errors.message.msg).to.equal('El mensaje es obligatorio')
                expect(body.errors.message).to.contain.property('param')
                expect(body.errors.message).to.contain.property('location')

                expect(body.errors).to.contain.property('finished')
                expect(body.errors.finished).to.contain.property('msg')
                expect(body.errors.finished.msg).to.equal('El estado terminado es obligatorio')
                expect(body.errors.finished).to.contain.property('param')
                expect(body.errors.finished).to.contain.property('location')

                expect(body.errors).to.contain.property('datetime')
                expect(body.errors.datetime).to.contain.property('msg')
                expect(body.errors.datetime.msg).to.equal('La fecha es obligatoria')
                expect(body.errors.datetime).to.contain.property('param')
                expect(body.errors.datetime).to.contain.property('location')

                done()
            })
            .catch((err) => done(err))
    })

    it('should get the todo created early', (done) => {

        request(app).get('/api/todo/all')
            .set({'x-token': token})
            .then((res) => {
                const body = res.body
                expect(body).to.contain.property('todos')
                expect(body.todos[0]).to.contain.property('message')
                expect(body.todos[0].message).to.equal(newTodo.message)
                expect(body.todos[0]).to.contain.property('finished')
                expect(body.todos[0].finished).to.equal(newTodo.finished)
                expect(body.todos[0]).to.contain.property('datetime')
                expect(body.todos[0]).to.contain.property('id')
                expect(body.todos[0].id).to.equal(newTodo.id)
                done()
            })
            .catch((err) => done(err))
    })

    it('should get the todo by id', (done) => {

        request(app).get(`/api/todo/findBy/${newTodo.id}`)
            .set({'x-token': token})
            .then((res) => {
                const body = res.body
                expect(body).to.contain.property('ok')
                expect(body.ok).to.equal(true)
                expect(body).to.contain.property('todo')
                expect(body.todo).to.contain.property('message')
                expect(body.todo.message).to.equal(newTodo.message)
                expect(body.todo).to.contain.property('finished')
                expect(body.todo.finished).to.equal(newTodo.finished)
                expect(body.todo).to.contain.property('datetime')
                expect(body.todo).to.contain.property('id')
                expect(body.todo.id).to.equal(newTodo.id)
                done()
            })
            .catch((err) => done(err))
    })

    it('should update the todo by id', (done) => {

        const todoUpdated = {
            "message": "Message updated",
            "finished": true
        }
        request(app).put(`/api/todo/${newTodo.id}`)
            .set({'x-token': token})
            .send(todoUpdated)
            .then((res) => {
                const body = res.body
                expect(body).to.contain.property('ok')
                expect(body.ok).to.equal(true)
                expect(body).to.contain.property('todo')
                expect(body.todo).to.contain.property('message')
                expect(body.todo.message).to.equal(todoUpdated.message)
                expect(body.todo).to.contain.property('finished')
                expect(body.todo.finished).to.equal(todoUpdated.finished)
                expect(body.todo).to.contain.property('datetime')
                expect(body.todo).to.contain.property('id')
                done()
            })
            .catch((err) => done(err))
    })

    it('should delete the todo by id', (done) => {

        request(app).delete(`/api/todo/${newTodo.id}`)
            .set({'x-token': token})
            .then((res) => {
                const body = res.body
                expect(body).to.contain.property('ok')
                expect(body.ok).to.equal(true)
                done()
            })
            .catch((err) => done(err))
    })

})