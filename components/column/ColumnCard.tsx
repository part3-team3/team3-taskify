import { Card } from '@/types/card';
import Column from '@/types/column';
import Image from 'next/image';
import { useState } from 'react';

import CardModal from '../TodoCardModal/CardModal';

const ColumnCard = ({
  card,
  columns,
  columnId,
  dashboardId,
  refetchColumn,
}: {
  card: Card;
  columns: Column[];
  columnId: number;
  dashboardId: number;
  refetchColumn: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { imageUrl, title, tags, dueDate } = card;
  const { profileImageUrl } = card.assignee;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        onClick={openModal}
        className="flex flex-col w-full h-auto p-12 bg-white cursor-pointer rounded-6 border-1px-solid-gray-30 md:h-93 md:flex-row md:p-20 xl:h-auto xl:flex-col"
      >
        <div className="relative w-full mb-10 mr-20 h-152 md:h-53 md:w-91 xl:h-160 xl:w-full">
          <Image
            className="object-cover rounded-6 md:rounded-4 xl:rounded-6"
            src={imageUrl}
            fill
            alt="카드 이미지"
          />
        </div>
        <div className="flex-col w-full gap-6 md:flex md:grow md:justify-between xl:grow-0 xl:gap-10">
          <div className="text-14 font-medium leading-[17px] text-black-20">
            {title}
          </div>

          <div className="flex items-end justify-between">
            <div className="w-full md:flex xl:flex-col">
              {/* tags */}
              <div className="flex gap-6 mt-6 overflow-hidden">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="h-max w-max whitespace-nowrap rounded-4 bg-green10 px-6 py-4 text-10 leading-[12px] text-green20"
                  >
                    {tag}
                  </div>
                ))}
              </div>

              {/* calendar + date */}
              <div className="flex justify-between mt-6 md:ml-16 md:w-full xl:ml-0 xl:mt-10">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14">
                    <Image
                      src="/images/icon/ic-calendar-gray.svg"
                      fill
                      alt="캘린더 아이콘"
                    />
                  </div>
                  <div className="text-10 font-medium leading-[12px] text-gray-40">
                    {dueDate}
                  </div>
                </div>

                {/* profile image */}
                <div className="relative h-22 w-22">
                  <Image
                    className="rounded-[70%]"
                    src={profileImageUrl}
                    alt="프로필 이미지"
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CardModal
        cardId={card.id}
        columns={columns}
        columnId={columnId}
        dashboardId={dashboardId}
        refetchColumn={refetchColumn}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default ColumnCard;
