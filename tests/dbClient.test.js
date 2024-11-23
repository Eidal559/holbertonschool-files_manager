import { expect } from 'chai';
import dbClient from '../utils/db.mjs';

describe('Database Client Tests', () => {
  it('should confirm MongoDB is alive', () => {
    expect(dbClient.isAlive()).to.be.true;
  });

  it('should return the number of users and files', async () => {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();

    expect(users).to.be.a('number');
    expect(files).to.be.a('number');
  });
});
