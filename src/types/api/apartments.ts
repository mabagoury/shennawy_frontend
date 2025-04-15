export interface IApartmentCreate {
  title: string;
  description?: string;
  price: number;
  location: string;
  thumbnail: string;
  images: string[];
}

export interface IApartment {
  _id: string;
  title: string;
  description: string;
  project: string;
  number: string;
  price: number;
  location: string;
  thumbnail: string;
  images: string[];
}