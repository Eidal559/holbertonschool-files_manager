import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.databaseName = database;

    // Connect to the database
    this.client.connect()
      .then(() => {
        console.log('Connected successfully to MongoDB');
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err.message);
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
      console.error('Error in nbUsers:', err.message);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const db = this.client.db(this.databaseName);
      const filesCollection = db.collection('files');
      return await filesCollection.countDocuments();
    } catch (err) {
      console.error('Error in nbFiles:', err.message);
      return 0;
    }
  }
}

// Create and export the instance of DBClient
const dbClient = new DBClient();
export default dbClient;
