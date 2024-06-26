import useMediaQuery from '@/hooks/useMediaQuery';
import { getCard } from '@/pages/api/getCard';
import { Card } from '@/types/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Modal from '../Modal';
import Article from './Article';
import Comments from './Comments';
import Dropdown from './Dropdown';
import Information from './Information';

const TodoModal = () => {
  const [card, setCard] = useState<Card>();
  const [kebabButtonVisible, setKebabButtonVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  let modalWidth = '327px';
  let modalHeight = '708px';

  if (isTablet) {
    modalWidth = '680px';
    modalHeight = '770px';
  } else if (isDesktop) {
    modalWidth = '730px';
    modalHeight = '763px';
  }

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

  // const handleEditButton = () => {};
  // const handleDeleteButton = () => {};

  return (
    <div className="px-20 py-40 md:px-28 md:py-32">
      <button
        onClick={openModal}
        className="px-4 py-2 mb-4 font-semibold text-black bg-blue-500 rounded hover:bg-blue-700"
      >
        테스트 모달 열기
      </button>
      <Modal
        width={modalWidth}
        height={modalHeight}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {card && (
          <div>
            <div className="flex justify-between pt-12 text-20 font-bold leading-[24px] text-black-20 md:text-24 md:leading-[29px]">
              <div className="flex">{card.title}</div>
              <div className="relative flex items-center gap-16 bottom-24 md:bottom-0 md:gap-24">
                <div className="relative flex w-20 h-20 md:h-28 md:w-28">
                  <Image
                    onClick={handleMenuOpen}
                    src="/images/icon/ic-kebab.svg"
                    fill
                    alt="케밥아이콘"
                  />
                  <Dropdown kebabButtonVisible={kebabButtonVisible} />
                </div>
                <div className="relative flex w-24 h-24 md:h-32 md:w-32">
                  <Image src="/images/icon/ic-x.svg" fill alt="x아이콘" />
                </div>
              </div>
            </div>
            {isMobile && <Information card={card} />}
            <div className="flex gap-24">
              <div>
                <Article card={card} />
                <Comments />
              </div>
              <div>
                {(isTablet || isDesktop) && <Information card={card} />}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default TodoModal;
