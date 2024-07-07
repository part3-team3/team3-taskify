import TodoCardModal from '@/components/TodoCardModal/TodoCardModal';
import TodoFormModal from '@/components/TodoModalForm/TodoFormModal';
import useMediaQuery from '@/hooks/useMediaQuery';
import { getCard } from '@/pages/api/common/getCard';
import { Card } from '@/types/card';
import Column from '@/types/column';
import getCardModalSize from '@/utils/getCardModalSize';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Modal from '../common/Modal';

const CardModal = ({
  cardId,
  columns,
  columnId,
  dashboardId,
  isModalOpen,
  refetchColumn,
  setIsModalOpen,
  closeModal,
}: {
  cardId: number;
  columns: Column[];
  columnId: number;
  dashboardId: number;
  isModalOpen: boolean;
  refetchColumn: () => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
}) => {
  const [isInEdit, setIsInEdit] = useState(false);
  const [card, setCard] = useState<Card>();
  const [isCardChanged, setIsCardChanged] = useState(false);

  const refetchCard = () => setIsCardChanged(!isCardChanged);

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

      setCard(cardData);
    };
    getTodoCard();
  }, [isCardChanged]);

  const handleCloseModal = () => {
    setIsInEdit(false);
    closeModal();
  };

  if (!card) return null;

  return (
    <Modal
      width={modalWidth}
      height={'auto'}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
    >
      {isInEdit ? (
        <TodoFormModal
          setIsModalOpen={setIsModalOpen}
          card={card}
          columnId={columnId}
          closeModal={closeModal}
          setIsInEdit={setIsInEdit}
          dashboardId={dashboardId}
          refetchColumn={refetchColumn}
          refetchCard={refetchCard}
        />
      ) : (
        <TodoCardModal
          card={card}
          columns={columns}
          closeModal={closeModal}
          setIsInEdit={setIsInEdit}
          refetchColumn={refetchColumn}
        />
      )}
    </Modal>
  );
};
export default CardModal;
