import fs from "fs";
import winston from "winston";
import "winston-daily-rotate-file";

const logDir = __dirname + "/../logs";

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const infoTransport = new winston.transports.DailyRotateFile({
  filename: "info.log",
  dirname: logDir,
  level: "info",
  maxFiles: "30d", // 30일치 저장
});

const errorTransport = new winston.transports.DailyRotateFile({
  filename: "error.log",
  dirname: logDir,
  level: "error",
  maxFiles: "30d", // 30일치 저장
});

const logger = winston.createLogger({
  transports: [infoTransport, errorTransport],
});

const stream = {
  write: (message: string) => {
    logger.info(message);
  },
};

export { logger, stream };
