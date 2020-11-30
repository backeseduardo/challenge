import supertest from 'supertest';
import Server from '../src/server';

beforeAll(() => {
  const server = new Server();
  server.init();

  global.testRequest = supertest(server.getApp());
});
