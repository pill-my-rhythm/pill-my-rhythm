import * as redis from "redis";
import dotenv from "dotenv";
dotenv.config();

// const REDIS_URL = "redis_server";

const redisClient = redis.createClient();

// const redisClient = redis.createClient({
//   url: `redis://${REDIS_URL}:6379`,
// });

redisClient.connect();

redisClient.on("ready", () => {
  console.log("redis is ready");
});

redisClient.on("error", (error) => {
  console.error(error);
});

export default redisClient;
