import mongoose from 'mongoose';
import request from 'supertest';

import app from '../app';
import { CreateUserDTO } from '../dtos/user.dto';

describe('Users Controller', () => {
  describe('POST /Users', () => {
    it('should create a new user', async () => {
      const newUser: CreateUserDTO = {
        name: 'Oleh',
      };

      const response = await request(app).post('/api/users').send(newUser);

      expect(response.status).toBe(201);
      expect(response.body.name).toEqual(newUser.name);
    });
  });

  afterAll(async (done) => {
    for (const modelKey in mongoose.connection.models) {
      const model = mongoose.connection.models[modelKey];
      await model.deleteMany();
    }

    mongoose.connection.close(done);
  });
});
