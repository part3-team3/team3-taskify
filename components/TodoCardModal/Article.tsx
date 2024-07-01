import { Card } from '@/types/card';
import Image from 'next/image';
import React from 'react';

import Tag from '../common/Tag';

const Article = ({ card }: { card: Card }) => {
  return (
    <div>
      <div className="flex gap-6 py-16">
        {card.tags.map((tag: string, index) => (
          <Tag index={index} title={tag} key={tag} />
        ))}
      </div>
      <div className="whitespace-normal text-12 font-normal leading-[22px] md:text-14 md:leading-[24px]">
        {card.description}
      </div>
      <div className="relative mb-19 mt-16 h-168 w-287 md:h-[245px] md:w-[420px] xl:h-[263px] xl:w-[450px]">
        <Image
          className="rounded-6 object-cover"
          src={card.imageUrl}
          alt="카드 이미지"
          fill
        />
      </div>
    </div>
  );
};

export default Article;
