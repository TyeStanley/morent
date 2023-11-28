"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import CarCard from "@/components/CarCard";
import { ProfileCarsProps, ProfileUserData, ProfileUserProps } from "@/types";
import { profileUserCar } from "@/lib/actions/user.actions";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function Profile() {
  const [user, setUser] = useState<ProfileUserProps>();
  const [rentedCars, setRentedCars] = useState<ProfileCarsProps[]>([]);
  const [ownedCars, setOwnedCars] = useState<ProfileCarsProps[]>([]);
  const [likedCars, setLikedCars] = useState<ProfileCarsProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const userCar = await profileUserCar();

      const { user, rentedCars, ownedCars, likedCars } =
        userCar as ProfileUserData;

      setUser(user);
      setRentedCars(rentedCars);
      setOwnedCars(ownedCars);
      setLikedCars(likedCars);
      setIsLoading(false);
    }

    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-28 flex h-screen items-start justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <main className="mx-auto flex max-w-[1400px] flex-col bg-light-white-200 p-5 dark:bg-primary-gray-900 xl:px-16 xl:py-8">
      {/* Section to add spacing around corners of screen */}
      <section>
        <h1 className="text-xl font-bold text-primary-gray-900 dark:text-white">
          My Profile
        </h1>

        <article className="mt-5 flex h-[301px] flex-col rounded-lg bg-white dark:bg-primary-gray-850 md:h-[240px]">
          {/* Provides the image background  */}
          <section className="relative h-[60%] w-full">
            {user?.coverImage && (
              <Image
                src={user.coverImage}
                alt="user"
                fill
                objectFit="cover"
                className="rounded-t-lg"
              />
            )}
          </section>

          {/* Provides the user information */}
          <section className="relative flex justify-between p-3 md:justify-end">
            <article className="relative -top-12 md:absolute md:left-7 md:flex md:gap-5">
              <span className="md:hidden">
                {user?.image && (
                  <Image
                    src={user.image}
                    alt="user"
                    width={70}
                    height={70}
                    className="rounded-full"
                  />
                )}
              </span>

              <span className="hidden md:block">
                {user?.image && (
                  <Image
                    src={user.image}
                    alt="user"
                    width={125}
                    height={125}
                    className="rounded-full"
                  />
                )}
              </span>

              <section className="mt-1.5 text-primary-gray-900 md:relative md:bottom-2 md:flex md:flex-col md:justify-end">
                <h2 className="text-xl font-bold dark:text-white">
                  {user?.name}
                </h2>
                <p className="text-sm opacity-50 dark:text-primary-blue-100">
                  {user?.role}
                </p>
              </section>
            </article>

            <article className="flex items-end justify-end md:relative">
              <Link href="/profile/edit">
                <Button
                  bgColor="bg-primary-blue-500"
                  textColor="text-white"
                  title="Edit Profile"
                  extraStyles="rounded-lg text-sm md:top-[15px] md:absolute md:right-5 md:w-[130px]"
                />
              </Link>
            </article>
          </section>
        </article>

        <article>
          <h2 className="mt-10 font-semibold text-primary-gray-400">
            My Rented Cars
          </h2>

          {rentedCars.length > 0 ? (
            <section className="mt-5 grid w-full grid-cols-1 items-center justify-center gap-5 smd:grid-cols-2 mdl:grid-cols-3 xl:grid-cols-4">
              {rentedCars.map((car) => (
                <CarCard
                  key={car._id}
                  id={car._id}
                  title={car.title}
                  type={car.type}
                  images={car.images}
                  fuel={car.fuel}
                  transmission={car.transmission}
                  people={car.people}
                  price={car.price}
                  priceBeforeDiscount={car.priceBeforeDiscount}
                  description={car.description}
                  isRented={car.isRented}
                />
              ))}
            </section>
          ) : (
            <section className="mt-5 animate-pulse text-center dark:text-white">
              WARNING: No rented cars. Please rent a car.
            </section>
          )}

          <h2 className="mt-10 hidden font-semibold text-primary-gray-400 md:block">
            My Cars for Rent
          </h2>

          {ownedCars.length > 0 ? (
            <section className="mt-5 grid w-full grid-cols-1 items-center justify-center gap-5 smd:grid-cols-2 mdl:grid-cols-3 xl:grid-cols-4">
              {ownedCars.map((car) => (
                <CarCard
                  key={car._id}
                  id={car._id}
                  title={car.title}
                  type={car.type}
                  images={car.images}
                  fuel={car.fuel}
                  transmission={car.transmission}
                  people={car.people}
                  price={car.price}
                  priceBeforeDiscount={car.priceBeforeDiscount}
                  description={car.description}
                  isRented={car.isRented}
                />
              ))}
            </section>
          ) : (
            <section className="mt-5 animate-pulse text-center dark:text-white">
              WARNING: No owned cars. Please add a car for rent.
            </section>
          )}

          <h2 className="mt-10 hidden font-semibold text-primary-gray-400 md:block">
            My Favorite Cars
          </h2>

          {likedCars.length > 0 ? (
            <section className="mt-5 grid w-full grid-cols-1 items-center justify-center gap-5 smd:grid-cols-2 mdl:grid-cols-3 xl:grid-cols-4">
              {likedCars.map((car) => (
                <CarCard
                  key={car._id}
                  id={car._id}
                  title={car.title}
                  type={car.type}
                  images={car.images}
                  fuel={car.fuel}
                  transmission={car.transmission}
                  people={car.people}
                  price={car.price}
                  priceBeforeDiscount={car.priceBeforeDiscount}
                  description={car.description}
                  isRented={car.isRented}
                />
              ))}
            </section>
          ) : (
            <section className="mt-5 animate-pulse text-center dark:text-white">
              WARNING: No favorited cars. Please favorite a car.
            </section>
          )}
        </article>
      </section>
    </main>
  );
}
