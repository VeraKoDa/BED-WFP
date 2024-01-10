import { PrismaClient } from "@prisma/client";
import {
  NotFoundError,
  InternalServerError,
  ValidationError,
} from "../errorhandling/errorHandlingClasses.js";

const prisma = new PrismaClient();

//
// get a list of all Bookings
const getBookings = async (query) => {
  return await prisma.booking.findMany({
    where: {
      userId: query.userId,
    },
  });
};

//
// get a booking by it's unique id
const getBookingById = async (id) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id,
    },
  });

  if (!booking) {
    throw new NotFoundError("booking", id);
  }

  return booking;
};

//
// Create a new booking
const createBooking = async (booking) => {
  try {
    const newBooking = await prisma.booking.create({
      data: {
        userId: booking.userId,
        propertyId: booking.propertyId,
        checkinDate: booking.checkinDate,
        checkoutDate: booking.checkoutDate,
        numberOfGuests: booking.numberOfGuests,
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,
      },
    });

    return newBooking;
  } catch (error) {
    console.error(error);
    const errorSpec = error.message.split("\n");
    throw new ValidationError(errorSpec[errorSpec.length - 1]);
  }
};

//
// Update booking by id
const updateBooking = async (id, booking) => {
  try {
    const updatedBooking = await prisma.booking.update({
      where: {
        id,
      },
      data: {
        userId: booking.userId,
        propertyId: booking.propertyId,
        checkinDate: booking.checkinDate,
        checkoutDate: booking.checkoutDate,
        numberOfGuests: booking.numberOfGuests,
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,
      },
    });
    return updatedBooking;
  } catch (error) {
    console.error(error);

    if (error.name === "PrismaClientKnownRequestError") {
      throw new NotFoundError("Booking", id);
    } else {
      const errorSpec = error.message.split("\n");
      throw new ValidationError(errorSpec[errorSpec.length - 1]);
    }
  }
};

//
// Delete booking by id
const deleteBooking = async (id) => {
  try {
    await prisma.booking.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new NotFoundError("booking", id);
  }

  return `Booking with id ${id} is succesfully removed.`;
};
export {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
