"use client";

import { UserValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from ".";
import Image from "next/image";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { OnboardingProps, UpdateUserParams } from "@/types";
import { useDropzone } from "react-dropzone";
import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { isBase64Image } from "@/lib/utils";
import FormDropdown from "./FormDropdown";
import { onboardingRoles } from "@/constants";

const OnboardingForm = ({ user }: OnboardingProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { startUpload } = useUploadThing("media");
  const [image, setImage] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [role, setRole] = useState("");

  const { register, handleSubmit, control } = useForm<UpdateUserParams>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      image: user?.image || "",
      name: user?.name || "",
      role: "",
      coverImage: "",
    },
  });

  const onSubmit: SubmitHandler<UpdateUserParams> = async (values) => {
    const blob = image;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].fileUrl) {
        values.coverImage = imgRes[0].fileUrl;
      }
    }

    await updateUser({
      image: values.image,
      name: values.name,
      userId: user.id,
      role,
      coverImage: values.coverImage,
      path: pathname,
    });

    router.push("/");
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
        Onboarding
      </h2>

      <article className="flex flex-wrap gap-y-6">
        <section className="flex w-full flex-col gap-2">
          {/* Profile Photo */}
          <label>
            {user.image ? (
              <Image
                src={user.image}
                alt="profile_icon"
                width={96}
                height={96}
                className="rounded-full object-contain"
              />
            ) : (
              <Image
                src="/car.svg"
                alt="profile_icon"
                width={56}
                height={56}
                className="rounded-full object-contain"
              />
            )}
          </label>

          <div className="flex w-full justify-between gap-5">
            <div className="flex w-full flex-col gap-2 md:w-1/2">
              {/* Name */}
              <label className="text-sm font-semibold text-primary-gray-900 dark:text-white">
                Name
              </label>
              <input
                className="h-11 w-full rounded-md bg-light-white-200 pl-3 text-xs text-primary-gray-900 dark:bg-primary-gray-800 dark:text-white"
                type="text"
                {...register("name")}
              />
            </div>

            <FormDropdown
              dropdownValues={onboardingRoles}
              name="role"
              register={register}
              selectedValue={role}
              setSelectedValue={setRole}
              placeholderName="Primary Use"
            />
          </div>
        </section>

        <div className="flex w-full flex-col gap-2">
          <h3 className="text-sm font-semibold text-primary-gray-900 dark:text-white">
            Upload Cover Image
          </h3>
          <Controller
            name="coverImage"
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
        <Button
          bgColor="bg-primary-blue-500"
          textColor="text-white"
          title="Register"
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default OnboardingForm;
