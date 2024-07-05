import TodoCardModal from '@/components/TodoCardModal/TodoCardModal';
import TodoFormModal from '@/components/TodoModalForm/TodoFormModal';
import useMediaQuery from '@/hooks/useMediaQuery';
import getColumns from '@/pages/api/TodoModalForm/getColumns';
import { getCard } from '@/pages/api/common/getCard';
import { Card } from '@/types/card';
import Column from '@/types/column';
import getCardModalSize from '@/utils/getCardModalSize';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Modal from '../common/Modal';

const CardModal = ({
  cardId,
  isModalOpen,
  setIsModalOpen,
  closeModal,
}: {
  cardId: number;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
}) => {
  const [isInEdit, setIsInEdit] = useState(false);
  const [card, setCard] = useState<Card>();
  const [columns, setColumns] = useState<Column[]>();

  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const { modalWidth } = getCardModalSize({
    isFormModal: isInEdit,
    isTablet,
    isDesktop,
  });

  useEffect(() => {
    const getTodoCard = async () => {
      const cardData: Card = await getCard(cardId);
      const columnData: Column[] = await getColumns();
      setCard(cardData);
      setColumns(columnData);
    };
    getTodoCard();
  }, [isInEdit]);

  if (!card) return null;
  if (!columns) return null;

  return (
    <div className="px-20 py-40 md:px-28 md:py-32">
      <Modal
        width={modalWidth}
        height={'auto'}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {isInEdit ? (
          <TodoFormModal
            setIsModalOpen={setIsModalOpen}
            card={card}
            isInEdit={isInEdit}
            setIsInEdit={setIsInEdit}
          />
        ) : (
          <TodoCardModal
            card={card}
            columns={columns}
            setIsInEdit={setIsInEdit}
          />
        )}
      </Modal>
    </div>
  );
};
export default CardModal;
