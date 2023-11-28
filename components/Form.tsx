"use client";

import { transmissions, carTypes, locations, carCapacities } from "@/constants";
import Button from "./Button";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { CarValidation } from "@/lib/validations/car";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCar } from "@/lib/actions/car.actions";
import CarRentInput from "@/components/CarRentInput";
import { CarFormInputs } from "@/types";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormDropdown from "./FormDropdown";

function Form() {
  const router = useRouter();
  const { startUpload } = useUploadThing("media");
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  // dropdown states
  const [transmission, setTransmission] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [people, setPeople] = useState("");

  // loading
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, control } = useForm<CarFormInputs>({
    resolver: zodResolver(CarValidation),
  });

  const onSubmit: SubmitHandler<CarFormInputs> = async (values) => {
    setIsLoading(true);
    const imgRes = await startUpload(files);

    const imageUrls = imgRes?.map(({ url }: { url: string }) => url);

    if (imageUrls) {
      values.images = imageUrls;
    }

    await createCar({
      title: values.title,
      type,
      price: values.price,
      people,
      transmission,
      location,
      fuel: values.fuel,
      description: values.description,
      images: values.images,
    });

    router.push("/profile");
  };

  const handleImage = (files: File[]) => {
    const fileReader = new FileReader();

    if (files && files.length > 0) {
      const file = files[0];
      setFiles(Array.from(files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        setImage(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    handleImage(acceptedFiles);
  };

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

  const filesSelected = acceptedFiles.map((file) => (
    <p key={file.name} className="text-xs text-primary-blue-300 md:text-sm">
      {file.name}
    </p>
  ));

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="my-6 text-base font-extrabold uppercase text-primary-blue-500 dark:text-primary-blue-300 md:text-xl">
        Car Info
      </h2>

      <article className="flex flex-wrap gap-y-6">
        <CarRentInput
          label="Car Title"
          placeholder="Your Car Title"
          name="title"
          register={register}
        />
        <FormDropdown
          selectedValue={type}
          setSelectedValue={setType}
          dropdownValues={carTypes}
          name="type"
          register={register}
          placeholderName="Type"
        />
        <CarRentInput
          label="Rent Price"
          placeholder="Price in dollars"
          name="price"
          register={register}
        />
        <FormDropdown
          selectedValue={people}
          setSelectedValue={setPeople}
          dropdownValues={carCapacities}
          name="people"
          register={register}
          placeholderName="Capacity"
        />
        <FormDropdown
          selectedValue={transmission}
          setSelectedValue={setTransmission}
          dropdownValues={transmissions}
          name="transmission"
          register={register}
          placeholderName="Transmission"
        />
        <FormDropdown
          selectedValue={location}
          setSelectedValue={setLocation}
          dropdownValues={locations}
          name="location"
          register={register}
          placeholderName="Location"
        />
        <CarRentInput
          label="Fuel Capacity"
          placeholder="Fuel Capacity in Liters"
          name="fuel"
          register={register}
        />
        <CarRentInput
          label="Short Description"
          placeholder="Short Description"
          name="description"
          register={register}
        />

        <div className="flex w-full flex-col gap-2">
          <h3 className="text-sm font-semibold text-primary-gray-900 dark:text-white">
            Upload Cover Image
          </h3>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <section className="flex flex-col items-center justify-center gap-2 border border-dashed px-4 py-10">
                <div
                  {...getRootProps({
                    className:
                      "dropzone flex flex-col items-center justify-center gap-2 cursor-pointer",
                  })}
                >
                  <input type="file" {...getInputProps()} {...field} />
                  <Image
                    src="/iconography/image-upload.svg"
                    alt="upload"
                    height={30}
                    width={30}
                  />
                  <p className="text-sm text-primary-gray-700 md:text-base">
                    Drag and drop an image, or{" "}
                    <span className="text-blue-500">Browse</span>
                  </p>
                  <p className="text-xs text-primary-gray-400 md:text-sm">
                    High resolution images (png, jpg, gif)
                  </p>
                  {filesSelected}
                </div>
              </section>
            )}
          />
        </div>
      </article>
      <div className="mt-5 flex justify-end">
        {isLoading ? (
          <button
            className="flex gap-2 rounded bg-primary-blue-500 px-5 py-3 text-xs text-white"
            disabled
          >
            <div className="animate-spin">M</div> Adding Car...
          </button>
        ) : (
          <Button
            bgColor="bg-primary-blue-500"
            textColor="text-white"
            title="Register Car"
            btnType="submit"
          />
        )}
      </div>
    </form>
  );
}

export default Form;
