import useMediaQuery from '@/hooks/useMediaQuery';
import getModalSize from '@/utils/getModalSize';
import { useState } from 'react';

import Modal from '../Modal';
import TodoEditModal from '../todoEditModal/TodoEditModal';
import TodoCardModal from './TodoCardModal';

const CardModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInEdit, setIsInEdit] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const { modalWidth, modalHeight } = getModalSize({
    isInEdit,
    isTablet,
    isDesktop,
  });

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
        height={modalHeight}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {isInEdit ? (
          <TodoEditModal />
        ) : (
          <TodoCardModal setIsInEdit={setIsInEdit} />
        )}
      </Modal>
    </div>
  );
};
export default CardModal;
