import app from 'app';
import request from 'supertest';
import { StackApi } from 'resourses/stack';

describe('Stack api', () => {
  beforeAll( () => {
    StackApi.removeAll();
  });

  afterAll(async () => {
    StackApi.removeAll();
    await app.close();
  });

  afterEach(async () => {
    StackApi.removeAll();
  });

  it('should add elements to stack', async () => {
    const res1 = await request(app).post('/stack').send({
      value: 'Hello',
    });
    const res2 = await request(app).post('/stack').send({
      value: 'World',
    });

    const elements = StackApi.getAll();

    expect(res1.statusCode).toBe(204);
    expect(res2.statusCode).toBe(204);
    expect(elements).toEqual(['Hello', 'World']);
  });

  it('should get and delete element from stack', async () => {
    await request(app).post('/stack').send({ value: 'Hello' });
    await request(app).post('/stack').send({ value: 'World' });

    const res = await request(app).delete('/stack');

    const elements = StackApi.getAll();

    expect(res.statusCode).toBe(200);
    expect(res.body).toBe('World');
    expect(elements).toEqual(['Hello']);
  });

  it('should always return the last added item', async () => {
    await request(app).post('/stack').send({ value: 'Hello' });
    await request(app).post('/stack').send({ value: 'Again' });
    const res1 = await request(app).delete('/stack');
    const res2 = await request(app).delete('/stack');

    expect(res1.body).toBe('Again');
    expect(res2.body).toBe('Hello');
  });

  it('should return null when stack is empty', async () => {
    const res = await request(app).delete('/stack');

    expect(res.body).toBe(null);
    expect(res.statusCode).toBe(200);
  });
});