import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { InvalidCredentialsError } from "../errorhandling/errorHandlingClasses.js";
import errorHandler from "../middleware/errorHandler.js";

const router = Router();
const prisma = new PrismaClient();

router.post(
  "/",
  async (req, res, next) => {
    const secretKey = process.env.AUTH_SECRET_KEY;
    const { username, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
          password,
        },
      });

      if (!user) {
        throw new InvalidCredentialsError(
          "login",
          "Wrong username or password!"
        );
      } else {
        const token = jwt.sign({ userId: user.id }, secretKey);
        return res
          .status(200)
          .json({ message: "Succesfully logged in!", token });
      }
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

export default router;
