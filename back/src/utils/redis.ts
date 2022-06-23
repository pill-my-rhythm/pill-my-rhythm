import * as redis from "redis";
import dotenv from "dotenv";
dotenv.config();

// const port = process.env.REDIS_PORT || 6379;
// const redisHost = process.env.REDIS_HOST || "127.0.0.1";
const redisClient = redis.createClient();

redisClient.connect();

redisClient.on("ready", () => {
  console.log("redis is ready");
});

redisClient.on("error", (error) => {
  console.error(error);
});

export default redisClient;
