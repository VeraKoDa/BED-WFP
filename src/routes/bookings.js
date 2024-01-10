import { Router } from "express";
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../services/bookingServices.js";
import errorHandler from "../middleware/errorHandler.js";
import checkAuth from "../middleware/auth.js";

const router = Router();

// Get all bookings
router.get(
  "/",
  async (req, res) => {
    const bookings = await getBookings(req.query);
    res.status(200).json(bookings);
  },
  errorHandler
);

// Create a new booking
router.post(
  "/",
  checkAuth,
  async (req, res, next) => {
    try {
      const newBooking = await createBooking(req.body);
      res.status(201).json(newBooking);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

// Get booking by ID
router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const bookingById = await getBookingById(id);
      res.status(200).json(bookingById);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

// Update booking by ID
router.put(
  "/:id",
  checkAuth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedBooking = await updateBooking(id, req.body);
      res.status(200).json(updatedBooking);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);
// Delete booking by ID
router.delete(
  "/:id",
  checkAuth,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedBooking = await deleteBooking(id);
      res.status(200).json(deletedBooking);
    } catch (error) {
      next(error);
    }
  },
  errorHandler
);

export default router;
