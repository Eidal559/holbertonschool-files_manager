import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.databaseName = database;

    // Connect to MongoDB
    this.client.connect()
      .then(() => {
        console.log('Connected to MongoDB successfully');
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
      });
  }

  isAlive() {
    return this.client && this.client.topology && this.client.topology.isConnected();
  }

  async nbUsers() {
    try {
      const db = this.client.db(this.databaseName);
      const usersCollection = db.collection('users');
      return await usersCollection.countDocuments();
    } catch (err) {
      console.error('Error in nbUsers:', err);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const db = this.client.db(this.databaseName);
      const filesCollection = db.collection('files');
      return await filesCollection.countDocuments();
    } catch (err) {
      console.error('Error in nbFiles:', err);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
