import jwt from "jsonwebtoken";
import { InvalidCredentialsError } from "../errorhandling/errorHandlingClasses.js";

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;
  const secretKey = process.env.AUTH_SECRET_KEY;

  if (!token) {
    throw new InvalidCredentialsError("token", "No token provided");
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token provided!", err });
    }

    req.user = decoded;
    next();
  });
};

export default checkAuth;
