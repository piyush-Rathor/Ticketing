import app from '../app'
import request from "supertest"
import MESSAGES from '../configs/res'
import { SIGN_UP_API } from './signup.test';
import { SIGN_IN_API } from './signin.test';
export const USER_DETAILS_API = `/api/users/user-details`;

describe('User-details Controller API Tests', () => {
    it('should throw error when token is not present in headers', async () => {
        const res = await request(app).get(USER_DETAILS_API).send();
        expect(res.statusCode).toBe(401);
    })

    it('should throw error when a random token is present in headers', async () => {
        const res = await request(app).get(USER_DETAILS_API).set('Authorization', `Bearer 1234`).send();
        expect(res.statusCode).toBe(401);
    })

    it('should return 200 when token is valid', async () => {
        await request(app)
            .post(SIGN_UP_API)
            .send({ email: 'abc@abc.com', password: 'abc@abc123' });
        const resSignIn = await request(app)
            .post(SIGN_IN_API)
            .send({ email: 'abc@abc.com', password: 'abc@abc123' });
        const res = await request(app).get(USER_DETAILS_API).set('Authorization', `Bearer ${resSignIn.body.data.token}`).send();

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', MESSAGES.SUC.USER_DETAILS);
    });
})