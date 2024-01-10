import { PrismaClient } from "@prisma/client";
import {
  NotFoundError,
  InternalServerError,
  ValidationError,
} from "../errorhandling/errorHandlingClasses.js";

const prisma = new PrismaClient();

//
// get a list of all Properties
const getProperties = async (query) => {
  return await prisma.property.findMany({
    where: {
      location: { contains: query.location },
      pricePerNight: query.pricePerNight,
    },
  });
};

//
// get a property by it's unique id
const getPropertyById = async (id) => {
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
  });
  if (!property) {
    throw new NotFoundError("property", id);
  }

  return property;
};

//
// Create a new property
const createProperty = async (property) => {
  try {
    const newProperty = await prisma.property.create({
      data: {
        title: property.title,
        description: property.description,
        location: property.location,
        pricePerNight: property.pricePerNight,
        bedroomCount: property.bedroomCount,
        bathRoomCount: property.bathRoomCount,
        maxGuestCount: property.maxGuestCount,
        hostId: property.hostId,
        rating: property.rating,
      },
    });

    return newProperty;
  } catch (error) {
    console.error("create property error: ", error);
    const errorSpec = error.message.split("\n");
    throw new ValidationError(errorSpec[errorSpec.length - 1]);
  }
};

//
// Update property by id
const updateProperty = async (id, body) => {
  try {
    const updatedProperty = await prisma.property.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        pricePerNight: body.pricePerNight,
        bedroomCount: body.bedroomCount,
        bathRoomCount: body.bathRoomCount,
        maxGuestCount: body.maxGuestCount,
        hostId: body.hostId,
        rating: body.rating,
      },
    });
    return updatedProperty;
  } catch (error) {
    console.error(error);

    if (error.name === "PrismaClientKnownRequestError") {
      throw new NotFoundError("Property", id);
    } else {
      const errorSpec = error.message.split("\n");
      throw new ValidationError(errorSpec[errorSpec.length - 1]);
    }
  }
};

//
// Delete property by id
const deleteProperty = async (id) => {
  try {
    await prisma.property.delete({
      where: {
        id,
      },
    });
    return `Property with id ${id} is succesfully removed.`;
  } catch (error) {
    throw new NotFoundError("property", id);
  }
};

export {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
