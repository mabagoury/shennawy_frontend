export interface ApartmentCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  location: string;
}

export interface ApartmentDetailsProps {
  params: {
    id: string;
  };
}

export interface CreateApartmentFormData {
  title: string;
  description: string;
  price: string;
  project: string;
  number: string;
  location: string;
  thumbnail: File | null;
  images: File[];
}