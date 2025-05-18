import React, { useEffect, useState } from 'react';

type Offer = {
  id: string;
  freeItemName: string;
  offerText: string;
};

type OffersCarouselProps = {
  offers: Offer[];
};

const OffersCarousel: React.FC<OffersCarouselProps> = ({ offers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (offers.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [offers]);

  if (offers.length === 0) return null;

  const offer = offers[currentIndex];

  return (
    <div className="w-full my-4 bg-blue-50 border border-blue-300 rounded-full shadow-md p-4 flex flex-col items-center justify-center text-center max-w-screen mx-auto h-20">
      <p className="font-bold text-xl text-blue-900">{offer.freeItemName}</p>
      <p className="text-blue-700 text-sm mt-1">{offer.offerText}</p>
    </div>
  );
};

export default OffersCarousel;
