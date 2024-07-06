import useMediaQuery from '@/hooks/useMediaQuery';
import getCardModalSize from '@/utils/getCardModalSize';

import Modal from '../common/Modal';
import TodoFormModal from './TodoFormModal';

const TodoCreateModal = ({
  columnId,
  dashboardId,
  isModalOpen,
  refetchColumn,
  closeModal,
  setIsModalOpen,
}: {
  columnId: number;
  dashboardId: number;
  isModalOpen: boolean;
  refetchColumn: () => void;
  closeModal: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const { modalWidth } = getCardModalSize({
    isTablet,
    isDesktop,
    isFormModal: true,
  });

  return (
    <Modal
      width={modalWidth}
      height={'auto'}
      isOpen={isModalOpen}
      onClose={closeModal}
    >
      <TodoFormModal
        refetchColumn={refetchColumn}
        columnId={columnId}
        closeModal={closeModal}
        dashboardId={dashboardId}
        setIsModalOpen={setIsModalOpen}
      />
    </Modal>
  );
};

export default TodoCreateModal;
