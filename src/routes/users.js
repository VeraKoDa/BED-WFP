import { Router } from "express";
import errorHandler from "../middleware/errorHandler.js";
import checkAuth from "../middleware/auth.js";
import checkAuth0 from "../middleware/auth0.js";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from "../services/userServices.js";

const router = Router();

// Get all user data, without the password
router.get("/", async (req, res) => {
  const users = await getUsers(req.query);
  res.status(200).json(users);
});

// Create a new user
router.post(
  "/",
  checkAuth,
  async (req, res, next) => {
    try {
      const newUser = await createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

// Get user by ID
router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

// Update user by ID
router.put(
  "/:id",
  checkAuth,
  async (req, res, next) => {
    try {
      const updatedUser = await updateUser(req.params, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

// Delete user by ID
router.delete(
  "/:id",
  checkAuth,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedUser = await deleteUser(id);
      res.status(200).json(`User with id ${id} is succesfully removed.`);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

export default router;
