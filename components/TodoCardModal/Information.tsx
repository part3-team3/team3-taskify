import { Card } from '@/types/card';
import Image from 'next/image';
import React from 'react';

const Information = ({ card }: { card: Card }) => {
  return (
    <div>
      <div className="flex h-64 pt-12 pb-10 pl-16 mt-16 border border-solid w-287 gap-62 rounded-8 border-gray-30 pr-50 md:h-155 md:w-180 md:flex-col md:gap-20 md:p-16 xl:w-200">
        <div className="flex flex-col gap-4">
          <div className="text-10 font-semibold leading-[12px] md:text-12 md:leading-[20px]">
            담당자
          </div>
          <div className="flex items-center gap-8">
            <div className="relative h-26 w-26 md:h-34 md:w-34">
              <Image
                fill
                src={'/images/icon/younghoon.svg'}
                alt="담당자 프로필 이미지"
              />
            </div>
            <div className="text-12 font-normal leading-[14px] text-black-20 md:text-14 md:leading-[17px]">
              {card.assignee.nickname}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 md:gap-6">
          <div className="text-10 font-semibold leading-[12px] md:text-12 md:leading-[20px]">
            마감일
          </div>
          <div className="text-12 font-normal leading-[14px] text-black-20 md:text-14 md:leading-[17px]">
            {card.dueDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
