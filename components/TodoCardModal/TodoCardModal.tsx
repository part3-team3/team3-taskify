import useMediaQuery from '@/hooks/useMediaQuery';
import axios from '@/lib/axios';
import { Card } from '@/types/card';
import Column from '@/types/column';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';

import Article from './Article';
import Comments from './Comments';
import Dropdown from './Dropdown';
import Information from './Information';

const TodoCardModal = ({
  card,
  columns,
  closeModal,
  setIsInEdit,
  refetchColumn,
}: {
  card: Card;
  columns: Column[];
  closeModal: () => void;
  setIsInEdit: Dispatch<SetStateAction<boolean>>;
  refetchColumn: () => void;
}) => {
  const [kebabButtonVisible, setKebabButtonVisible] = useState<boolean>(false);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const handleMenuOpen = () => {
    setKebabButtonVisible(!kebabButtonVisible);
  };

  const handleDeleteCard = async () => {
    await axios.delete(`cards/${card.id}`);
    closeModal();
    refetchColumn();
  };

  return (
    card && (
      <div>
        <div className="flex justify-between pt-12 text-20 font-bold leading-[24px] text-black-20 md:text-24 md:leading-[29px]">
          <div className="flex whitespace-normal">{card.title}</div>
          <div className="relative flex items-center gap-16 bottom-24 md:bottom-0 md:gap-24">
            <div className="relative flex w-20 h-20 md:h-28 md:w-28">
              <Image
                onClick={handleMenuOpen}
                className="cursor-pointer"
                src="/images/icon/ic-kebab.svg"
                fill
                alt="케밥아이콘"
              />
              <Dropdown
                setIsInEdit={setIsInEdit}
                handleDeleteCard={handleDeleteCard}
                kebabButtonVisible={kebabButtonVisible}
              />
            </div>

            <div
              onClick={closeModal}
              className="relative flex w-24 h-24 cursor-pointer md:h-32 md:w-32"
            >
              <Image src="/images/icon/ic-x.svg" fill alt="x아이콘" />
            </div>
          </div>
        </div>
        {isMobile && <Information card={card} />}
        <div className="flex gap-24">
          <div>
            <Article card={card} columns={columns} />
            <Comments card={card} columns={columns} />
          </div>
          <div>{(isTablet || isDesktop) && <Information card={card} />}</div>
        </div>
      </div>
    )
  );
};
export default TodoCardModal;
