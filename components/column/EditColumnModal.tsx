import Modal from '@/components/common/Modal';
import useColumnTitleDuplicateChecker from '@/hooks/useColumnTitleDuplicateChecker';
import { useState } from 'react';

const EditColumnModal = ({
  closeModal,
  onEdit,
  onDelete,
  columnTitle,
  columnId,
  dashboardId,
}: {
  closeModal: () => void;
  onEdit: (columnId: number, title: string) => Promise<void>;
  onDelete: (columnId: number) => Promise<void>;
  columnTitle: string;
  columnId: number;
  dashboardId: number;
}) => {
  const [inputValue, setInputValue] = useState(columnTitle);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);

  const isTitleUpdated = columnTitle !== inputValue;
  const isDuplicate = useColumnTitleDuplicateChecker(dashboardId, inputValue);

  const openDeleteConfirmModal = () => setIsDeleteConfirmVisible(true);

  const handleEditClick = () => {
    onEdit(columnId, inputValue);
    closeModal();
  };

  const handleDeleteClick = () => {
    onDelete(columnId);
    closeModal();
  };

  return isDeleteConfirmVisible ? (
    <Modal
      isOpen={true}
      onClose={() => {
        setIsDeleteConfirmVisible(false);
      }}
      width="540px"
      height="276px"
    >
      <h2 className="font-pretendard flex h-full flex-col items-center justify-center text-center font-medium text-[18]">
        칼럼의 모든 카드가 삭제됩니다.
      </h2>
      <div className="mt-[-35px] flex justify-end gap-[12px]">
        <button
          className="btn_modal_large_white"
          onClick={() => {
            setIsDeleteConfirmVisible(false);
          }}
        >
          취소
        </button>
        <button className="btn_modal_large_purple" onClick={handleDeleteClick}>
          삭제
        </button>
      </div>
    </Modal>
  ) : (
    <Modal // Modal 컴포넌트에 넘겨주고 싶은 값을 prop으로 설정하기
      isOpen={true}
      onClose={closeModal}
      width="540px"
      height="276px"
    >
      <h2 className="mb-32 text-2xl font-bold">컬럼 관리</h2>
      <p className="mb-10 h-21">이름</p>
      <input
        className={`mb-28 rounded p-16 border-1px-solid-gray-30 sm:h-[42px] sm:w-[287px] md:h-[48px] md:w-[484px] lg:h-[48px] lg:w-[484px] ${
          isDuplicate ? 'border-red' : ''
        }`}
        value={inputValue}
        placeholder="컬럼 제목을 입력해주세요"
        onChange={(e) => setInputValue(e.target.value)}
      />
      {isTitleUpdated && isDuplicate && (
        <p className="absolute mt-[-20px] text-[14px] text-red">
          중복된 칼럼 이름입니다.
        </p>
      )}
      <div className="flex">
        <button
          onClick={openDeleteConfirmModal}
          className="flex items-end flex-grow underline text-gray-40 hover:text-violet-20"
        >
          삭제하기
        </button>
        <button onClick={closeModal} className="btn_modal_large_white">
          취소
        </button>
        <button
          onClick={handleEditClick}
          className="ml-11 btn_modal_large_purple xl:ml-12"
        >
          변경
        </button>
      </div>
    </Modal>
  );
};

export default EditColumnModal;
