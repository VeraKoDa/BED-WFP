import { Router } from "express";
import {
  getAmenities,
  getAmenityById,
  createAmenity,
  updateAmenity,
  deleteAmenity,
} from "../services/amenityServices.js";
import errorHandler from "../middleware/errorHandler.js";
import checkAuth from "../middleware/auth.js";

const router = Router();

// Get all amenities
router.get(
  "/",
  async (req, res) => {
    const amenities = await getAmenities();
    res.status(200).json(amenities);
  },
  errorHandler
);

// Create a new amenity
router.post(
  "/",
  checkAuth,
  async (req, res, next) => {
    try {
      const newAmenity = await createAmenity(req.body);
      res.status(201).json(newAmenity);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

// Get amenity by ID
router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const amenityById = await getAmenityById(id);
      res.status(200).json(amenityById);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

// Update amenity by ID
router.put(
  "/:id",
  checkAuth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedAmenity = await updateAmenity(id, req.body);
      res.status(200).json(updatedAmenity);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);
// Delete amenity by ID
router.delete(
  "/:id",
  checkAuth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedAmenity = await deleteAmenity(id);
      res.status(200).json(deletedAmenity);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);
export default router;
