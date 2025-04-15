import Image from 'next/image';
import Link from 'next/link';

import { ApartmentCardProps } from "../types/components/apartments";

export default function ApartmentCard({ id, image, title, price, location }: ApartmentCardProps) {
  return (
    <Link href={`/apartments/${id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] w-[280px] mx-auto border border-gray-200">
        <div className="relative w-full h-[280px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="280px"
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="px-6 py-5">
          <h3 className="text-base font-semibold line-clamp-1 mb-3">{title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-900">{price}</span>
            <span className="text-xs text-gray-600">{location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 