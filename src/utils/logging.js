import winston from "winston";

const { combine, timestamp, json, align, colorize, errors } = winston.format;

const logging = winston.createLogger({
  level: "info",
  format: combine(
    errors({ stack: true }),
    colorize({ all: true }),
    align(),
    json(),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    })
  ),
  defaultMeta: { service: "booking-api" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logging.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logging;
