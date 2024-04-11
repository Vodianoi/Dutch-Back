import {app} from '../app';
import request from "supertest";

describe('app', () => {
    it('should return a string', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe("Hello World!");
        expect(response.status).toBe(200);
    });
});

