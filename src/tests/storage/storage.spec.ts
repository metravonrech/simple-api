import app from 'app';
import request from 'supertest';
import { StorageApi } from 'resourses/storage';

function wait(timeInMs = 1000) {
  return new Promise(resolve => setTimeout(resolve, timeInMs));
}

describe('Storage api', () => {
  beforeAll(() => {
    StorageApi.removeAll();
  });

  afterAll(async () => {
    StorageApi.removeAll();
    await app.close();
  });
  afterEach(async () => {
    StorageApi.removeAll();
  });

  it('should add key-value pairs to storage', async () => {
    const res1 = await request(app).post('/storage').send({
      key: 1,
      value: 'John',
    });

    const res2 = await request(app).post('/storage').send({
      key: 2,
      value: 'Cena',
    });
    const storageValues = StorageApi.getAll();

    expect(res1.statusCode).toBe(204);
    expect(res2.statusCode).toBe(204);
    expect(storageValues).toEqual({ 1: 'John', 2: 'Cena' });
  });

  it('should add key value pair with ttl and then delete it', async () => {
    const res1 = await request(app).post('/storage').send({
      key: 'John',
      value: 'Doe',
      ttl: 1000,
    });
    expect(res1.statusCode).toEqual(204);

    const res2 = await request(app).get('/storage/John');
    expect(res2.body).toEqual({ 'John': 'Doe' });

    await wait(1000);

    const res3 = await request(app).get('/storage/John');
    expect(res3.body).toEqual(null);
  });

  it('should get key-value pairs from storage', async () => {
    await request(app).post('/storage').send({
      key: 1,
      value: 'John',
    });
    const res1 = await request(app).get('/storage/1');
    const res2 = await request(app).get('/storage/age');

    expect(res1.statusCode).toBe(200);
    expect(res1.body).toEqual({ 1: 'John' });
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toEqual(null);
  });

  it('should delete key-value pair from storage', async () => {
    await request(app).post('/storage').send({
      key: 1,
      value: 'John',
    });
    const res1 = await request(app).delete('/storage/1');

    const storageValues = StorageApi.getAll();
    expect(res1.statusCode).toBe(204);
    expect(storageValues).toEqual({});
  });
});