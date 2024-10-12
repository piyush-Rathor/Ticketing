import app from '../app'
import request from "supertest"

describe('should throw 404 with random route', () => {
    it('should return 404 status code on random route', async () => {
        const res = await request(app).post(`/${Math.random()}`).send()
        expect(res.statusCode).toBe(404)
    })
    it('should return 404 status code on random get route', async () => {
        const res = await request(app).get(`/${Math.random()}`).send()
        expect(res.statusCode).toBe(404)
    })
})
