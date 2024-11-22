import dbClient from './db.mjs';


// Wait for the database connection to establish
const waitConnection = () => {
  return new Promise((resolve, reject) => {
    let i = 0;
    const repeatFct = async () => {
      await setTimeout(() => {
        i += 1;
        if (i >= 10) {
          reject(new Error('Cannot connect to DB'));
        } else if (!dbClient.isAlive()) {
          repeatFct();
        } else {
          resolve();
        }
      }, 1000);
    };
    repeatFct();
  });
};

(async () => {
  console.log(dbClient.isAlive()); // Should print false initially
  await waitConnection();         // Wait for the database connection
  console.log(dbClient.isAlive()); // Should print true once connected
  console.log(await dbClient.nbUsers()); // Number of documents in the "users" collection
  console.log(await dbClient.nbFiles()); // Number of documents in the "files" collection
})();
