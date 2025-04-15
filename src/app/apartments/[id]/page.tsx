import { notFound } from 'next/navigation';
import ImageGallery from '@/components/ImageGallery';
import { ApartmentDetailsProps } from "../../../types/components/apartments";
import { fetchApartmentById } from '@/lib/api/apartments';  // Import the new API function

export default async function ApartmentDetails({ params }: ApartmentDetailsProps) {
  const { id } = await params;
  
  let apartment = null;

  try {
    apartment = await fetchApartmentById(id);
  } catch(error) {
    console.log(error);
    notFound();
  }

  if (!apartment) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full bg-gray-50 flex flex-col px-4 py-12">
      <div className="max-w-7xl mx-auto w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">{apartment.title}</h2>
        </div>

        <ImageGallery 
          images={apartment.images}
          thumbnail={apartment.thumbnail}
          title={apartment.title}
        />

        <div className="p-8">
          <p className="text-gray-700 text-xl leading-relaxed mb-10 max-w-4xl">
            {apartment.description}
          </p>

          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold text-gray-800 w-32">Price:</h3>
              <div className="text-xl text-gray-700">{apartment.price}</div>
            </div>

            <div className="flex items-center">
              <h3 className="text-xl font-semibold text-gray-800 w-32">Project:</h3>
              <div className="text-xl text-gray-700">{apartment.project}</div>
            </div>

            <div className="flex items-center">
              <h3 className="text-xl font-semibold text-gray-800 w-32">Number:</h3>
              <div className="text-xl text-gray-700">{apartment.number}</div>
            </div>

            <div className="flex items-center">
              <h3 className="text-xl font-semibold text-gray-800 w-32">Location:</h3>
              <div className="text-xl text-gray-700">{apartment.location}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
