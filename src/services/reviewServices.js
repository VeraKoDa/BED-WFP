import { PrismaClient } from "@prisma/client";
import {
  NotFoundError,
  InternalServerError,
  ValidationError,
} from "../errorhandling/errorHandlingClasses.js";

const prisma = new PrismaClient();

//
// get a list of all Reviews
const getReviews = async () => {
  return await prisma.review.findMany();
};

//
// get a review by it's unique id
const getReviewById = async (id) => {
  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!review) {
    throw new NotFoundError("review", id);
  }

  return review;
};

//
// Create a new review
const createReview = async (review) => {
  try {
    const newReview = await prisma.review.create({
      data: {
        userId: review.userId,
        propertyId: review.propertyId,
        rating: review.rating,
        comment: review.comment,
      },
    });

    return newReview;
  } catch (error) {
    console.error(error);
    const errorSpec = error.message.split("\n");
    throw new ValidationError(errorSpec[errorSpec.length - 1]);
  }
};

//
// Update review by id
const updateReview = async (id, review) => {
  try {
    const updatedReview = await prisma.review.update({
      where: {
        id,
      },
      data: {
        userId: review.userId,
        propertyId: review.propertyId,
        rating: review.rating,
        comment: review.comment,
      },
    });
    return updatedReview;
  } catch (error) {
    console.error(error);

    if (error.name === "PrismaClientKnownRequestError") {
      throw new NotFoundError("Review", id);
    } else {
      const errorSpec = error.message.split("\n");
      throw new ValidationError(errorSpec[errorSpec.length - 1]);
    }
  }
};

//
// Delete review by id
const deleteReview = async (id) => {
  try {
    await prisma.review.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new NotFoundError("review", id);
  }

  return `Review with id ${id} is succesfully removed.`;
};
export { getReviews, getReviewById, createReview, updateReview, deleteReview };
