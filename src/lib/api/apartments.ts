import { IApartment, IApartmentCreate } from "../../types/api/apartments";
import environment from "@/config/environment";

export async function createApartment(apartmentData: IApartmentCreate) {
  const response = await fetch(
    `${environment.NEXT_PUBLIC_API_URL}/apartments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apartmentData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create apartment");
  }

  return await response.json();
}

export async function fetchApartments({
  offset = 0,
  limit = 10,
} = {}): Promise<{
  data: IApartment[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}> {
  const res = await fetch(
    `${environment.NEXT_PUBLIC_API_URL}/apartments?offset=${offset}&limit=${limit}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch apartments: ${res.status}`);
  }

  return await res.json();
}

export async function fetchApartmentById(id: string): Promise<IApartment> {
  const response = await fetch(
    `${environment.NEXT_PUBLIC_API_URL}/apartments/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch apartment details");
  }

  return await response.json();
}
