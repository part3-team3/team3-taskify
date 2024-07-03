// NewColumnModal.tsx
import Modal from '@/components/common/Modal';
import React, { useEffect, useState } from 'react';

interface NewColumnModalProps {
  closeModal: () => void;
  onAddColumn: () => void;
}

const NewColumnModal: React.FC<NewColumnModalProps> = ({
  closeModal,
  onAddColumn,
}) => {
  const handleCreate = () => {
    onAddColumn();
    closeModal();
  };

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div>
      {isVisible && (
        <Modal
          isOpen={true}
          onClose={() => setIsVisible(false)}
          width="540px"
          height="276px"
        >
          <h2 className="mb-32 text-2xl font-bold">컬럼 관리</h2>
          <p className="mb-10 h-21">이름</p>
          <input
            className="mb-28 h-[48px] w-[484px] rounded border-1px-solid-gray-30 sm:h-[42px] sm:w-[287px]"
            placeholder="컬럼 제목을 입력해주세요"
          />
          <div className="flex justify-between">
            <button
              className="btn_modal_large_white"
              onClick={() => setIsVisible(false)}
            >
              취소
            </button>
            <button className="btn_modal_large_purple" onClick={handleCreate}>
              생성
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NewColumnModal;
