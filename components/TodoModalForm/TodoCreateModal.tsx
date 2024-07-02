import useMediaQuery from '@/hooks/useMediaQuery';
import getCardModalSize from '@/utils/getCardModalSize';
import { useState } from 'react';

import Modal from '../common/Modal';
import TodoFormModal from './TodoFormModal';

const TodoCreateModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const { modalWidth } = getCardModalSize({
    isTablet,
    isDesktop,
    isFormModal: true,
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
        height={'auto'}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <TodoFormModal />
      </Modal>
    </div>
  );
};

export default TodoCreateModal;
