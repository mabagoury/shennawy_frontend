'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  thumbnail: string;
  title: string;
}

export default function ImageGallery({ images, thumbnail, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(thumbnail);

  return (
    <div>
      <div className="relative h-[500px] w-full mb-[1%]">
        <Image
          src={selectedImage || thumbnail}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-y-[5%]">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative w-[15%] aspect-square cursor-pointer border-2 rounded-lg overflow-hidden ${
              selectedImage === img ? 'border-coral-500' : 'border-transparent'
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <Image
              src={img}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover hover:opacity-90 transition-opacity rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}