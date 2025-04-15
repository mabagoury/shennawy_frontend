"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchApartments } from "@/lib/api/apartments";
import PropertyCard from "@/components/ApartmentCard";
import { IApartment } from "@/types/api/apartments";

export default function ApartmentsInfiniteScroll() {
  const limit = 10;

  const [apartments, setApartments] = useState<IApartment[]>([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || (total !== null && apartments.length >= total)) return;

    setLoading(true);
    try {
      const responseBody = await fetchApartments({ limit, offset });
      setApartments((prev) => {
        const apartments = [...prev, ...responseBody.data];
        return Array.from(
          new Map(apartments.map((apt) => [apt._id, apt])).values()
        );
      });
      setOffset((prev) => prev + limit);
      setTotal(responseBody.pagination.total);
    } catch (err) {
      console.error("Error loading more apartments:", err);
    } finally {
      setLoading(false);
    }
  }, [loading, offset, apartments.length, total]);

  // Load initial batch when component mounts
  useEffect(() => {
    loadMore();
  }, [loadMore]);

  // Set up IntersectionObserver for infinite scrolling
  useEffect(() => {
    const currentRef = loaderRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          !loading &&
          (!total || apartments.length < total)
        ) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loadMore, loading, total, apartments.length]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
        {apartments.map((apartment) => (
          <PropertyCard
            key={apartment._id}
            id={apartment._id}
            image={apartment.thumbnail}
            title={apartment.title}
            price={apartment.price}
            location={apartment.location}
          />
        ))}
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}

      <div ref={loaderRef} className="h-12"></div>
    </div>
  );
}
