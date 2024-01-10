import logging from "../utils/logging.js";

const logMiddleware = async (req, res, next) => {
  const start = new Date();
  next();

  const ms = new Date() - start;

  const log = ` 
    Method: ${req.method}, URL: ${req.originalUrl}, Status: ${res.statusCode}, Duration: ${ms} ms,
  `;

  if (
    res.statusCode === 401 ||
    res.statusCode === 404 ||
    res.statusCode === 501
  ) {
    authFailed(req, res);
  } else {
    logging.info(log);
  }
};

const authFailed = (req, res) => {
  const body = req.body;
  let bodyElements = [];
  for (const [key, value] of Object.entries(body)) {
    bodyElements.push(`${key}: ${value}`);
  }

  logging.error(
    `${req.method} ${req.originalUrl} Status: ${res.statusCode}. Body: ${bodyElements}`
  );
};
export default logMiddleware;
