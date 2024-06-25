import { getCard } from '@/pages/api/getCard';
import { Card } from '@/types/Card';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Comments from './Comments';
import Modal from './Modal';

const TodoModal = () => {
  const [card, setCard] = useState<Card>();

  const [kebabButtonVisible, setKebabButtonVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const getTodoCard = async () => {
      const cardData: Card = await getCard();

      setCard(cardData);
    };

    getTodoCard();
  }, []);

  const handleMenuOpen = () => {
    setKebabButtonVisible(!kebabButtonVisible);
  };

  const handleEditButton = () => {};

  const handleDeleteButton = () => {};

  return (
    <div className="px-28 py-32">
      <button
        onClick={openModal}
        className="text-black bg-blue-500 hover:bg-blue-700 mb-4 rounded px-4 py-2 font-semibold"
      >
        테스트 모달 열기
      </button>
      <Modal
        width="730px"
        height="763px"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {card && (
          <div className="flex gap-24">
            <div className="flex flex-col">
              <div className="text-24 font-bold text-black-20">
                {card.title}
              </div>
              <div>
                {card.tags.map((tag) => (
                  <div key={tag} className="h-max w-max px-6 py-4">
                    {tag}
                  </div>
                ))}
              </div>
              <div className="text-14 font-normal leading-[24px]">
                {card.description}
              </div>
              <div className="relative my-16 h-[263px] w-[450px]">
                <Image
                  className="rounded-6 object-cover"
                  src={card.imageUrl}
                  alt="카드 이미지"
                  fill
                />
              </div>

              <Comments />
            </div>
            <div className="flex flex-col gap-21">
              <div className="relative flex justify-end gap-24">
                <Image
                  onClick={handleMenuOpen}
                  src="/images/icon/ic-kebab.svg"
                  width={28}
                  height={28}
                  alt="케밥아이콘"
                />
                {kebabButtonVisible ? (
                  <div className="absolute right-63 top-32 h-82 w-93 rounded-6 border border-solid border-gray-30 bg-white">
                    <div
                      onClick={handleEditButton}
                      className="flex-center m-6 h-32 w-81 cursor-pointer text-14 font-normal leading-[24px] hover:rounded-4 hover:bg-violet-10 hover:text-violet-20"
                    >
                      수정하기
                    </div>
                    <div
                      onClick={handleDeleteButton}
                      className="flex-center m-6 h-32 w-81 cursor-pointer text-14 font-normal leading-[24px] hover:rounded-4 hover:bg-violet-10 hover:text-violet-20"
                    >
                      삭제하기
                    </div>
                  </div>
                ) : (
                  ''
                )}
                <Image
                  src="/images/icon/ic-x.svg"
                  width={32}
                  height={32}
                  alt="x아이콘"
                />
              </div>
              <div className="flex h-155 w-200 flex-col gap-20 rounded-8 border border-solid border-gray-30 p-16">
                <div className="flex flex-col gap-6">
                  <div className="text-12 font-semibold leading-[20px]">
                    담당자
                  </div>
                  <div className="flex items-center gap-8">
                    <Image
                      width={34}
                      height={34}
                      src={'/images/icon/younghoon.svg'}
                      alt="담당자 프로필 이미지"
                    />
                    <div className="text-14 font-normal leading-[17px] text-black-20">
                      {card.assignee.nickname}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="text-12 font-semibold leading-[20px]">
                    마감일
                  </div>
                  <div className="text-14 font-normal leading-[17px] text-black-20">
                    {card.dueDate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TodoModal;
