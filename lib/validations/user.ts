import * as z from "zod";

export const UserValidation = z.object({
  name: z.string().nonempty({ message: "Name cannot be empty" }).max(30),
  image: z.string().url().nonempty({ message: "Image cannot be empty" }),
  role: z.string(),
  coverImage: z.string(),
});
