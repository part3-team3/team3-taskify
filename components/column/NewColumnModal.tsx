// NewColumnModal.tsx
import Modal from '@/components/common/Modal';
import React, { Dispatch, SetStateAction } from 'react';

const NewColumnModal = ({
  setModalInputValue,
  handleAddColumn,
  closeModal,
}: {
  setModalInputValue: Dispatch<SetStateAction<string>>;
  handleAddColumn: () => Promise<void>;
  closeModal: () => void;
}) => {
  return (
    <Modal isOpen={true} onClose={closeModal} width="540px" height="276px">
      <h2 className="mb-32 text-2xl font-bold">새 컬럼 생성</h2>
      <p className="mb-10 h-21">이름</p>
      <input
        onChange={(e) => setModalInputValue(e.target.value)}
        className="mb-28 h-48 w-484 rounded px-16 py-16 border-1px-solid-gray-30"
        placeholder="컬럼 제목을 입력해주세요"
      />
      <div className="flex justify-end">
        <button onClick={closeModal} className="btn_modal_large_white">
          취소
        </button>
        <button
          onClick={handleAddColumn}
          className="ml-11 btn_modal_large_purple xl:ml-12"
        >
          생성
        </button>
      </div>
    </Modal>
  );
};

export default NewColumnModal;
