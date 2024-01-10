import { Router } from "express";
import {
  getHosts,
  getHostById,
  createHost,
  updateHost,
  deleteHost,
} from "../services/hostServices.js";
import errorHandler from "../middleware/errorHandler.js";
import checkAuth from "../middleware/auth.js";

const router = Router();

// Get all hosts
router.get(
  "/",
  async (req, res) => {
    const hosts = await getHosts(req.query);
    res.status(200).json(hosts);
  },
  errorHandler
);

// Create a new host
router.post(
  "/",
  checkAuth,
  async (req, res, next) => {
    try {
      const newHost = await createHost(req.body);
      res.status(201).json(newHost);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

// Get host by ID
router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const hostById = await getHostById(id);
      res.status(200).json(hostById);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);
// Update host by ID
router.put(
  "/:id",
  checkAuth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedHost = await updateHost(id, req.body);
      res.status(200).json(updatedHost);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);
// Delete host by ID
router.delete(
  "/:id",
  checkAuth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedHost = await deleteHost(id);
      res.status(200).json(deletedHost);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);
export default router;
