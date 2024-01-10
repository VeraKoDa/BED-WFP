import { Router } from "express";
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../services/propertyServices.js";
import errorHandler from "../middleware/errorHandler.js";
import checkAuth from "../middleware/auth.js";

const router = Router();

// Get all properties
router.get(
  "/",
  async (req, res) => {
    const properties = await getProperties(req.query);
    res.status(200).json(properties);
  },
  errorHandler
);

// Create a new property
router.post(
  "/",
  checkAuth,
  async (req, res, next) => {
    try {
      const newProperty = await createProperty(req.body);
      res.status(201).json(newProperty);
    } catch (error) {
      console.log("in error van prop create");
      next(error);
    }
  },
  errorHandler
);

// Get property by ID
router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const propertyById = await getPropertyById(id);
      res.status(200).json(propertyById);
    } catch (error) {
      console.log("in error van get prop by id");
      next(error);
    }
  },
  errorHandler
);

// Update property by ID
router.put(
  "/:id",
  checkAuth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedProperty = await updateProperty(id, req.body);
      res.status(200).json(updatedProperty);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

// Delete property by ID
router.delete(
  "/:id",
  checkAuth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedProperty = await deleteProperty(id);
      res.status(200).json(deletedProperty);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

export default router;
