import { Card } from '@/types/card';
import Column from '@/types/column';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Tag from '../common/Tag';

const Article = ({ card, columns }: { card: Card; columns: Column[] }) => {
  const [columnName, setColumnName] = useState<string>();

  useEffect(() => {
    const getColumnName = () => {
      const column = columns.find(
        (column: Column) => card.columnId === column.id,
      );
      if (!column) return;

      setColumnName(column.title);
    };

    getColumnName();
  }, [card.columnId, columns]);

  return (
    <div className="w-287 md:w-420 xl:w-450">
      <div className="flex flex-wrap gap-6 py-16">
        <div className="flex h-max w-max gap-6 rounded-11 bg-violet-10 px-8 py-4">
          <Image
            width={6}
            height={6}
            src="/images/icon/ic-dot-purple.svg"
            alt="상태 드롭다운 색상 아이콘"
          />
          <div className="text-10 leading-[12px] text-violet-20">
            {columnName}
          </div>
        </div>
        <div className="mx-6 h-20 w-1 bg-gray-30 md:mx-14" />
        {card.tags.map((tag: string, index) => (
          <Tag index={index} title={tag} key={tag} />
        ))}
      </div>
      <div className="max-h-100 w-287 overflow-scroll whitespace-normal break-words text-12 font-normal leading-[22px] md:w-420 md:text-14 md:leading-[24px] xl:w-450">
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
