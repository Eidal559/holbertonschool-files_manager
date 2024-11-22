import { MongoClient } from 'mongodb';


class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });

    // Connect to MongoDB
    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
        console.log(`Connected to database: ${database}`);
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        this.db = null;
      });
  }

  isAlive() {
    return !!this.db; // Return true if `db` is initialized
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
