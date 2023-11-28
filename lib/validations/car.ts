import * as z from "zod";

export const CarValidation = z.object({
  title: z.string().nonempty({ message: "Title cannot be empty" }).max(30),
  type: z.string().nonempty({ message: "Type cannot be empty" }).max(30),
  price: z.coerce.number().gte(10).lte(100).safe(),
  people: z.string().nonempty({}),
  transmission: z.enum(["manual", "automatic", "Automatic", "Manual"]),
  location: z
    .string()
    .nonempty({ message: "Location cannot be empty" })
    .min(3)
    .max(30),
  fuel: z.coerce.number().gte(10).lte(120).safe(),
  description: z
    .string()
    .nonempty({ message: "Description cannot be empty" })
    .min(3)
    .max(160),
});
