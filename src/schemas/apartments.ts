import { z } from "zod";

export const apartmentCreateSchema = z.object({
  title: z.string().min(8, "Title must be at least 8 characters"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required").transform(val => parseFloat(val)).refine(val => !isNaN(val), "Invalid price"),
  project: z.string().min(3, "Project must be at least 3 characters").optional(),
  number: z.string().min(1, "Unit number is required"),
  location: z.string().min(1, "Location is required"),
  thumbnail: z.instanceof(File).refine(file => file !== null, "Thumbnail image is required"),
  images: z.array(z.instanceof(File)),
});