import Modal from '@/components/common/Modal';
import useColumnTitleDuplicateChecker from '@/hooks/useColumnTitleDuplicateChecker';
import useMediaQuery from '@/hooks/useMediaQuery';
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

  const isColumnEditModalDisabled = inputValue.trim() === '' ? true : false;
  const isMobile = useMediaQuery('(max-width: 767px)');

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
      width={isMobile ? '327px' : '540px'}
      height={isMobile ? '241px' : '276px'}
    >
      <div className="flex flex-col">
        <div className="font-medium text-center mb-68 mt-53 text-16 md:mt-80">
          칼럼의 모든 카드가 삭제됩니다.
        </div>
        <div className="flex gap-12 md:justify-end">
          <button
            className="btn_modal_small_white md:btn_modal_large_white"
            onClick={() => {
              setIsDeleteConfirmVisible(false);
            }}
          >
            취소
          </button>
          <button
            className="btn_modal_small_purple md:btn_modal_large_purple"
            onClick={handleDeleteClick}
          >
            삭제
          </button>
        </div>
      </div>
    </Modal>
  ) : (
    <Modal
      isOpen={true}
      onClose={closeModal}
      width={isMobile ? '327px' : '540px'}
      height={isMobile ? '274px' : '276px'}
    >
      <div className="flex flex-col gap-24 md:gap-32">
        <h2 className="text-20 font-bold leading-[24px] text-black-20 md:text-24 md:leading-[29px]">
          컬럼 관리
        </h2>
        <div className="flex flex-col gap-10">
          <p className="h-21">이름</p>
          <input
            className={`h-42 w-287 rounded p-16 border-1px-solid-gray-30 md:h-48 md:w-484 ${
              isDuplicate ? 'border-red' : ''
            }`}
            value={inputValue}
            placeholder="컬럼 제목을 입력해주세요"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        {isTitleUpdated && isDuplicate && (
          <p className="absolute mt-[-20px] text-[14px] text-red">
            중복된 칼럼 이름입니다.
          </p>
        )}
        <div className="flex flex-col gap-16 md:flex-row">
          <button
            onClick={openDeleteConfirmModal}
            className="flex items-end flex-grow underline text-gray-40 hover:text-violet-20"
          >
            삭제하기
          </button>
          <div className="flex gap-12">
            <button
              onClick={closeModal}
              className="btn_modal_small_white md:btn_modal_large_white"
            >
              취소
            </button>
            <button
              disabled={isColumnEditModalDisabled}
              onClick={handleEditClick}
              className={` ${isColumnEditModalDisabled ? 'btn_modal_small_gray md:btn_modal_large_gray' : 'btn_modal_small_purple md:btn_modal_large_purple'} `}
            >
              변경
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditColumnModal;
