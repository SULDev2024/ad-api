const request = require('supertest');
const expect = require('chai').expect;
const app = require('../index'); // If needed, export `app` in `index.js`.

describe('To-Do API', () => {
    it('should return all tasks', async () => {
        const res = await request(app).get('/tasks');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('should add a new task', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({ task: 'New Task' });
        expect(res.status).to.equal(201);
        expect(res.body.tasks).to.include('New Task');
    });

    it('should update a task', async () => {
        const res = await request(app)
            .put('/tasks/0')
            .send({ task: 'Updated Task' });
        expect(res.status).to.equal(200);
    });

    it('should delete a task', async () => {
        const res = await request(app).delete('/tasks/0');
        expect(res.status).to.equal(200);
    });
});
