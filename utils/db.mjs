import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    this.client = null;
    this.db = null;

    // Connect to MongoDB
    MongoClient.connect(url)
      .then((client) => {
        this.client = client;
        this.db = client.db(database);
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
      });
  }

  isAlive() {
    return !!this.db; // Return true if the database connection exists
  }

  async nbUsers() {
    if (!this.db) return 0; // Return 0 if the database is not connected
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.db) return 0; // Return 0 if the database is not connected
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
