import { createClient } from "redis";

const RedisClient = createClient({
  url: "redis://:@127.0.0.1:6379",
});

RedisClient.on("error", (err) => {
  console.log("Redis error =>", err);
});

// Connect to the Redis server
RedisClient.connect();

// Export the Redis client to use in other parts of the app
export default RedisClient;
