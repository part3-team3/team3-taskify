import useMediaQuery from '@/hooks/useMediaQuery';
import { getCard } from '@/pages/api/getCard';
import { Card } from '@/types/card';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Article from './Article';
import Comments from './Comments';
import Dropdown from './Dropdown';
import Information from './Information';

const TodoModal = ({
  setIsInEdit,
}: {
  setIsInEdit: Dispatch<SetStateAction<boolean>>;
}) => {
  const [card, setCard] = useState<Card>();
  const [kebabButtonVisible, setKebabButtonVisible] = useState<boolean>(false);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

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

  // const handleEditSelect = () => {};
  // const handleDeleteButton = () => {};

  return (
    card && (
      <div>
        <div className="flex justify-between pt-12 text-20 font-bold leading-[24px] text-black-20 md:text-24 md:leading-[29px]">
          <div className="flex">{card.title}</div>
          <div className="relative bottom-24 flex items-center gap-16 md:bottom-0 md:gap-24">
            <div className="relative flex h-20 w-20 md:h-28 md:w-28">
              <Image
                onClick={handleMenuOpen}
                src="/images/icon/ic-kebab.svg"
                fill
                alt="케밥아이콘"
              />
              <Dropdown
                setIsInEdit={setIsInEdit}
                kebabButtonVisible={kebabButtonVisible}
                // handleEditSelect={handleEditSelect}
              />
            </div>
            <div className="relative flex h-24 w-24 md:h-32 md:w-32">
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
          <div>{(isTablet || isDesktop) && <Information card={card} />}</div>
        </div>
      </div>
    )
  );
};
export default TodoModal;
