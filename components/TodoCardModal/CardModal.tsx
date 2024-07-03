import TodoCardModal from '@/components/TodoCardModal/TodoCardModal';
import TodoFormModal from '@/components/TodoModalForm/TodoFormModal';
import useMediaQuery from '@/hooks/useMediaQuery';
import getColumns from '@/pages/api/TodoModalForm/getColumns';
import { getCard } from '@/pages/api/common/getCard';
import { Card } from '@/types/card';
import Column from '@/types/column';
import getCardModalSize from '@/utils/getCardModalSize';
import { useEffect, useState } from 'react';

import Modal from '../common/Modal';

const CardModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInEdit, setIsInEdit] = useState(false);
  const [card, setCard] = useState<Card>();
  const [columns, setColumns] = useState<Column[]>();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const { modalWidth } = getCardModalSize({
    isFormModal: isInEdit,
    isTablet,
    isDesktop,
  });

  useEffect(() => {
    const getTodoCard = async () => {
      const cardData: Card = await getCard();
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
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 mb-4 rounded px-4 py-2 font-semibold text-black"
      >
        테스트 모달 열기
      </button>

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
