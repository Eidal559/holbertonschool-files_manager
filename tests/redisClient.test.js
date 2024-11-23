import { expect } from 'chai';
import redisClient from '../utils/redis.js';

describe('Redis Client Tests', () => {
  it('should confirm Redis is alive', () => {
    expect(redisClient.isAlive()).to.be.true;
  });

  it('should set, get, and delete a key in Redis', async () => {
    await redisClient.set('test_key', 'test_value', 10);
    const value = await redisClient.get('test_key');
    expect(value).to.equal('test_value');

    await redisClient.del('test_key');
    const deletedValue = await redisClient.get('test_key');
    expect(deletedValue).to.be.null;
  });
});
