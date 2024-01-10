import { PrismaClient } from "@prisma/client";
import {
  NotFoundError,
  InternalServerError,
  ValidationError,
} from "../errorhandling/errorHandlingClasses.js";

const prisma = new PrismaClient();

//
// get a list of all Amenities
const getAmenities = async () => {
  return await prisma.amenity.findMany();
};

//
// get a amenity by it's unique id
const getAmenityById = async (id) => {
  const amenity = await prisma.amenity.findUnique({
    where: {
      id,
    },
  });

  if (!amenity) {
    throw new NotFoundError("amenity", id);
  }

  return amenity;
};

//
// Create a new amenity
const createAmenity = async (amenity) => {
  try {
    const newAmenity = await prisma.amenity.create({
      data: {
        name: amenity.name,
      },
    });

    return newAmenity;
  } catch (error) {
    console.error(error);
    const errorSpec = error.message.split("\n");
    throw new ValidationError(errorSpec[errorSpec.length - 1]);
  }
};

//
// Update amenity by id
const updateAmenity = async (id, amenity) => {
  try {
    const updatedAmenity = await prisma.amenity.update({
      where: {
        id,
      },
      data: {
        name: amenity.name,
      },
    });
    return updatedAmenity;
  } catch (error) {
    console.error(error);

    if (error.name === "PrismaClientKnownRequestError") {
      throw new NotFoundError("Amenity", id);
    } else {
      const errorSpec = error.message.split("\n");
      throw new ValidationError(errorSpec[errorSpec.length - 1]);
    }
  }
};

//
// Delete amenity by id
const deleteAmenity = async (id) => {
  try {
    await prisma.amenity.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new NotFoundError("amenity", id);
  }

  return `Amenity with id ${id} is succesfully removed.`;
};
export {
  getAmenities,
  getAmenityById,
  createAmenity,
  updateAmenity,
  deleteAmenity,
};
