import { Router } from "express";
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../services/reviewServices.js";
import errorHandler from "../middleware/errorHandler.js";
import checkAuth from "../middleware/auth.js";

const router = Router();

// Get all reviews
router.get(
  "/",
  async (req, res) => {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  },
  errorHandler
);

// Create a new review
router.post(
  "/",
  checkAuth,
  async (req, res, next) => {
    try {
      const newReview = await createReview(req.body);
      res.status(201).json(newReview);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

// Get review by ID
router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const reviewById = await getReviewById(id);
      res.status(200).json(reviewById);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

// Update review by ID
router.put(
  "/:id",
  checkAuth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedReview = await updateReview(id, req.body);
      res.status(200).json(updatedReview);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);
// Delete review by ID
router.delete(
  "/:id",
  checkAuth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedReview = await deleteReview(id);
      res.status(200).json(deletedReview);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

export default router;
