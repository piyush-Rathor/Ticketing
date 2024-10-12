import app from '../app'
import request from "supertest"
import MESSAGES from '../configs/res'
export const SIGN_UP_API = `/api/users/sign-up`;


describe('Signup Controller API Tests', () => {
    const testInvalidSignUp = async (requestBody: object, expectedErrors: string[]) => {
        console.log(SIGN_UP_API)
        const res = await request(app).post(SIGN_UP_API).send(requestBody);
        expect(res.statusCode).toBe(422);
        expect(res.body).toHaveProperty('message', MESSAGES.ERRORS.INVALID_DATA);
        expect(res.body).toHaveProperty('data.errors');

        expectedErrors.forEach((error) => {
            expect(res.body.data.errors).toContain(error);
        });
    };

    it('should return 422 when both email and password are missing', async () => {
        await testInvalidSignUp(
            {},  // Empty body
            [
                'Email is required',
                'Password is required'
            ]
        );
    });

    it('should throw 422 error when email is missing', async () => {
        await testInvalidSignUp(
            { password: 'abc@abc123' },
            ['Email is required']
        );
    });

    it('should throw 422 error when password is missing', async () => {
        await testInvalidSignUp(
            { email: 'abc@abc.in' },
            ['Password is required']
        );
    });

    it('should throw 422 error when email and password are invalid', async () => {
        await testInvalidSignUp(
            { email: 'invalid-email', password: '123' },
            [
                'Email must be a valid email address',
                'Password must be at least 6 characters'
            ]
        );
    });

    it('should return 422 for short password with correct email', async () => {
        await testInvalidSignUp(
            { email: 'abc@abc.com', password: '123' },
            ['Password must be at least 6 characters']
        );
    });

    it('should return 200 when both email and password are valid', async () => {
        const res = await request(app)
            .post(SIGN_UP_API)
            .send({ email: 'abc@abc.com', password: 'abc@abc123' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', MESSAGES.SUC.SIGN_UP);
    });
});
