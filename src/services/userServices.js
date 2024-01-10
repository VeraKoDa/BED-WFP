import { PrismaClient } from "@prisma/client";
import {
  InternalServerError,
  NotFoundError,
} from "../errorhandling/errorHandlingClasses.js";

const prisma = new PrismaClient();

//
// get a list of all users
const getUsers = async (query) => {
  return prisma.user.findMany({
    where: {
      username: query.username,
      email: query.email,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
    },
  });
};

//
// get a user by it's unique id
const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new NotFoundError("user", id);
  }

  return user;
};

//
// Create a new user
const createUser = async (user) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
      },
    });

    return newUser;
  } catch (error) {
    const errorSpec = error.message.split("\n");
    throw new ValidationError(errorSpec[errorSpec.length - 1]);
  }
};

//
// Update user by id
const updateUser = async (params, body) => {
  const { id } = params;
  const { username, password, name, email, phoneNumber, profilePicture } = body;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
      },
    });
    return updatedUser;
  } catch (error) {
    throw new NotFoundError("User", id);
  }
};

//
// Delete user by id
const deleteUser = async (id) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new NotFoundError("User", id);
  }

  return id;
};
export { getUsers, getUserById, createUser, updateUser, deleteUser };
