import { createClient } from "redis";

const RedisClient = createClient({
  url: process.env.REDIS_URL,
});

RedisClient.on("error", (err) => {
  console.log("Redis error =>", err);
});

// Connect to the Redis server
RedisClient.connect();

// Export the Redis client to use in other parts of the app
export default RedisClient;
