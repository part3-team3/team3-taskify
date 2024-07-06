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
      <div className="relative">
        <input
          className={`mb-28 rounded border border-solid border-[#D9D9D9] sm:h-[42px] sm:w-[287px] md:h-[48px] md:w-[484px] lg:h-[48px] lg:w-[484px] ${
            isDuplicate ? 'border-red' : ''
          }`}
          placeholder="컬럼 제목을 입력해주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {isDuplicate && (
          <p className="absolute mt-[-20px] text-[14px] text-red">
            중복된 칼럼 이름입니다.
          </p>
        )}
      </div>
      <div className="flex justify-end gap-[12px]">
        <button className="btn_modal_large_white" onClick={closeModal}>
          취소
        </button>
        <button
          className="btn_modal_large_purple"
          onClick={handleCreate}
          disabled={isDuplicate || !inputValue}
        >
          생성
        </button>
      </div>
    </Modal>
  );
};

export default NewColumnModal;
