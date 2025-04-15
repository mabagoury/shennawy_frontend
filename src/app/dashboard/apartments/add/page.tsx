"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createApartment } from "@/lib/api/apartments";
import { uploadFile } from "@/lib/api/files";
import { apartmentCreateSchema } from "@/schemas/apartments";
import { CreateApartmentFormData } from "@/types/components/apartments";

export default function AddApartment() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateApartmentFormData>({
    title: "",
    description: "",
    price: "",
    project: "",
    number: "",
    location: "",
    thumbnail: null,
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isThumbnail = false
  ) => {
    const files = e.target.files;
    if (!files) return;

    if (isThumbnail) {
      setFormData((prev) => ({ ...prev, thumbnail: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, images: Array.from(files) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const validatedData = apartmentCreateSchema.parse(formData);

      const thumbnailUrl = await uploadFile(validatedData.thumbnail);
      const imageUrls = await Promise.all(
        validatedData.images.map((file) => uploadFile(file))
      );

      await createApartment({
        ...validatedData,
        thumbnail: thumbnailUrl,
        images: imageUrls,
      });

      router.push("/");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors.map((e) => e.message).join(", "));
      } else {
        console.log(err);
        setError("Failed to create property. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen w-full bg-gray-50 px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Add New Property
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-[1vw] bg-white p-[3vw] sm:p-[2vw] lg:p-[1vw] rounded-lg shadow-lg"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 py-2 px-4 text-gray-900"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={4}
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 py-2 px-4 text-gray-900"
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 py-2 px-4 text-gray-900"
            required
          />
        </div>

        <div>
          <label
            htmlFor="project"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Project
          </label>
          <input
            type="text"
            id="project"
            value={formData.project}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, project: e.target.value }))
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 py-2 px-4 text-gray-900"
            required
          />
        </div>

        <div>
          <label
            htmlFor="number"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Number
          </label>
          <input
            type="text"
            id="number"
            value={formData.number}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, number: e.target.value }))
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 py-2 px-4 text-gray-900"
            required
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, location: e.target.value }))
            }
            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 py-2 px-4 text-gray-900"
            required
          />
        </div>

        <div>
          <label
            htmlFor="thumbnail"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Thumbnail Image
          </label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={(e) => handleFileChange(e, true)}
            className="mt-1 block w-full text-sm sm:text-base py-2 px-4 bg-white text-gray-900 border-0 focus:ring-0" // No borders and no focus ring
            required
          />
        </div>

        <div>
          <label
            htmlFor="images"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Additional Images
          </label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e, false)}
            className="mt-1 block w-full text-sm sm:text-base py-2 px-4 bg-white text-gray-900 border-0 focus:ring-0" // No borders and no focus ring
          />
        </div>

        {error && <div className="text-red-500 text-sm mt-[2vw]">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="all: unset w-full py-[1vw] px-6 rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 mt-[0.5vw]"
        >
          {loading ? "Creating..." : "Create Property"}
        </button>
      </form>
    </main>
  );
}
