import { Card } from '@/types/card';
import Image from 'next/image';
import React from 'react';

const Article = ({ card }: { card: Card }) => {
  return (
    <div>
      <div className="py-16">
        {card.tags.map((tag: string) => (
          <div
            key={tag}
            className="h-max w-max rounded-4 bg-violet-10 px-6 py-4 text-10 leading-[12px] text-violet-20"
          >
            {tag}
          </div>
        ))}
      </div>
      <div className="text-12 font-normal leading-[22px] md:text-14 md:leading-[24px]">
        {card.description}
      </div>
      <div className="relative mb-19 mt-16 h-168 w-287 md:h-[245px] md:w-[420px] xl:h-[263px] xl:w-[450px]">
        <Image
          className="object-cover rounded-6"
          src={card.imageUrl}
          alt="카드 이미지"
          fill
        />
      </div>
    </div>
  );
};

export default Article;
