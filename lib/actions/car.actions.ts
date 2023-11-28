"use server";

import Car from "../models/car.model";
import User from "../models/user.model";
import { CarTypes, CarSearchProps } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "./user.actions";
import { connectToDB } from "../mongoose";

export async function createCar({
  title,
  type,
  price,
  people,
  transmission,
  location,
  fuel,
  description,
  images,
}: CarTypes) {
  try {
    const clerk = await currentUser();
    const user = await fetchUser(clerk?.id);

    const newCar = await Car.create({
      title,
      type,
      price,
      people,
      transmission,
      location,
      fuel,
      description,
      images,
      owner: user?._id,
    });

    await User.findByIdAndUpdate(
      { _id: user._id },
      { $push: { ownedCars: newCar } },
    );
  } catch (error: any) {
    console.log(error);
  }
}

// Filters data to query certain cars from the database
export async function carSearch({
  carName,
  carType,
  maxPrice,
  location,
  availabilityFrom,
  availabilityTo,
}: CarSearchProps) {
  connectToDB();

  const carTypeArr = [];
  const peopleNumArr = [];

  const carTypes = ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"];
  const peopleNums = ["2 Person", "4 Person", "6 Person", "8 or More"];

  for (const key in carType) {
    if (carTypes.includes(key) && carType[key] === true) {
      carTypeArr.push(key);
    }
    if (peopleNums.includes(key) && carType[key] === true) {
      peopleNumArr.push(key[0]);
    }
  }

  const filter = {
    ...(carType && { title: { $regex: carName, $options: "i" } }),
    ...(carTypeArr.length !== 0 && { type: carTypeArr }),
    ...(peopleNumArr.length !== 0 && { people: peopleNumArr }),
    ...(maxPrice && { price: { $lte: maxPrice } }),
    ...(location && { location: { $regex: location, $options: "i" } }),
  };

  try {
    const cars = await Car.find(filter, { __v: 0 });

    return cars;
  } catch (error: any) {
    console.log(error);
  }
}

export async function fetchAllCars(
  currentPage: number,
  totalCarsToShow: number,
) {
  try {
    connectToDB();

    const skip = (currentPage - 1) * totalCarsToShow;

    // add popular car = false when real data
    const data = await Car.find({ popularCar: false })
      .skip(skip)
      .limit(totalCarsToShow);

    const plainCars = JSON.parse(JSON.stringify(data));

    return plainCars;
  } catch (error: any) {
    console.log(error);
  }
}

export async function fetchPopularCars() {
  try {
    connectToDB();

    const data = await Car.find({ popularCar: true });

    const plainCars = JSON.parse(JSON.stringify(data));

    return plainCars;
  } catch (error: any) {
    console.log(error);
  }
}

export async function rentCar(id: string | undefined) {
  try {
    const clerk = await currentUser();
    const user = await fetchUser(clerk?.id);

    await Car.findByIdAndUpdate(id, { isRented: true });

    await User.findByIdAndUpdate(user._id, {
      $push: { rentedCars: id },
    });
  } catch (error: any) {
    console.log(error);
  }
}

export async function totalCarCount() {
  try {
    connectToDB();

    const total = await Car.countDocuments();
    return total;
  } catch (error: any) {
    throw new Error(`Failed to count: ${error.message}`);
  }
}

export async function likeCar(id: string) {
  try {
    const clerk = await currentUser();
    const user = await fetchUser(clerk?.id);

    await User.findByIdAndUpdate(user._id, {
      $push: { likedCars: id },
    });
  } catch (error: any) {
    console.log(error);
  }
}

export async function unlikeCar(id: string) {
  try {
    const clerk = await currentUser();
    const user = await fetchUser(clerk?.id);

    await User.findByIdAndUpdate(user._id, {
      $pull: { likedCars: id },
    });
  } catch (error: any) {
    console.log(error);
  }
}
