const redisClient = require('./utils/redis.js');

(async () => {
  console.log(redisClient.isAlive()); // Should print true
  console.log(await redisClient.get('myKey')); // Should print null
  await redisClient.set('myKey', 12, 5); // Sets a value with 5 seconds expiry
  console.log(await redisClient.get('myKey')); // Should print 12

  setTimeout(async () => {
    console.log(await redisClient.get('myKey')); // Should print null (after expiry)
  }, 10000);
})();
