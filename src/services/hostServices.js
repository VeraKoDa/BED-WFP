import { PrismaClient } from "@prisma/client";
import {
  NotFoundError,
  InternalServerError,
  ValidationError,
} from "../errorhandling/errorHandlingClasses.js";

const prisma = new PrismaClient();

//
// get a list of all Hosts
const getHosts = async (query) => {
  return await prisma.host.findMany({
    where: {
      name: query.name,
    },
  });
};

//
// get a host by it's unique id
const getHostById = async (id) => {
  const host = await prisma.host.findUnique({
    where: {
      id,
    },
  });

  if (!host) {
    throw new NotFoundError("host", id);
  }

  return host;
};

//
// Create a new host
const createHost = async (host) => {
  try {
    const newHost = await prisma.host.create({
      data: {
        username: host.username,
        password: host.password,
        name: host.name,
        email: host.email,
        phoneNumber: host.phoneNumber,
        profilePicture: host.profilePicture,
        aboutMe: host.aboutMe,
      },
    });

    return newHost;
  } catch (error) {
    const errorSpec = error.message.split("\n");
    throw new ValidationError(errorSpec[errorSpec.length - 1]);
  }
};

//
// Update host by id
const updateHost = async (id, host) => {
  try {
    const updatedHost = await prisma.host.update({
      where: {
        id,
      },
      data: {
        username: host.username,
        password: host.password,
        name: host.name,
        email: host.email,
        phoneNumber: host.phoneNumber,
        profilePicture: host.profilePicture,
        aboutMe: host.aboutMe,
      },
    });
    return updatedHost;
  } catch (error) {
    console.error(error);

    if (error.name === "PrismaClientKnownRequestError") {
      throw new NotFoundError("Host", id);
    } else {
      const errorSpec = error.message.split("\n");
      throw new ValidationError(errorSpec[errorSpec.length - 1]);
    }
  }
};

//
// Delete host by id
const deleteHost = async (id) => {
  try {
    await prisma.host.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new NotFoundError("host", id);
  }

  return `Host with id ${id} is succesfully removed.`;
};
export { getHosts, getHostById, createHost, updateHost, deleteHost };
