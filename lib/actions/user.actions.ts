"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { UpdateUserParams } from "@/types";
import { currentUser } from "@clerk/nextjs";
import Car from "../models/car.model";

export async function fetchUser(userId: string | undefined) {
  try {
    connectToDB();

    const user = await User.findOne({ id: userId });

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    console.log(error);
  }
}

export async function fetchUserImage() {
  try {
    connectToDB();

    const clerk = await currentUser();
    const user = await User.find({ id: clerk?.id });

    return user[0]?.image;
  } catch (error: any) {
    console.log(error);
  }
}

export async function profileUserCar() {
  try {
    const clerk = await currentUser();

    connectToDB();

    const user = await User.findOne({ id: clerk?.id });

    const rentedCars = await Car.find({ _id: [...user?.rentedCars] });

    const ownedCars = await Car.find({ owner: user?._id });

    const likedCars = await Car.find({ _id: [...user?.likedCars] });

    return JSON.parse(
      JSON.stringify({ user, rentedCars, ownedCars, likedCars }),
    );
  } catch (error: any) {
    console.log(error);
  }
}

export async function updateUser({
  userId,
  name,
  image,
  coverImage,
  role,
  path,
}: UpdateUserParams): Promise<void> {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      {
        id: userId,
      },
      { name, image, role, coverImage, path, onboarded: true },
      { upsert: true },
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.log(error);
  }
}
