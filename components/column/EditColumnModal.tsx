import Modal from '@/components/common/Modal';
import { editColumn } from '@/pages/api/column/editColumn';
import { getColumn } from '@/pages/api/column/getColumn';
import React, { useEffect, useState } from 'react';

interface EditColumnModalProps {
  columnId: number;
  closeModal: () => void;
  onEditColumn: (newTitle: string) => void;
  handleDeleteColumn: (columnId: number) => Promise<void>;
  dashboardId: number;
}

interface ColumnType {
  title: string;
}

const EditColumnModal: React.FC<EditColumnModalProps> = ({
  closeModal,
  onEditColumn,
  handleDeleteColumn,
  columnId,
  dashboardId,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const checkDuplicate = async () => {
      try {
        const columns = await DupliChecker(dashboardId);
        const isDuplicated = columns.some(
          (column: ColumnType) => column.title === inputValue,
        );
        setIsDuplicate(isDuplicated);
      } catch (error) {
        console.error('Error checking for duplicate columns', error);
      }
    };

    if (inputValue) {
      checkDuplicate();
    }
  }, [inputValue, dashboardId]);

  const DupliChecker = async (dashboardId: number) => {
    try {
      const response = await getColumn(dashboardId);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch column list', error);
      throw error;
    }
  };

  const handleEdit = async () => {
    if (!isDuplicate) {
      try {
        await editColumn(columnId, inputValue);
        localStorage.setItem('newColumnTitle', inputValue);
        onEditColumn(inputValue);
        closeModal();
      } catch (error) {
        console.error('Error updating column title', error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await handleDeleteColumn(columnId);
      closeModal();
    } catch (error) {
      console.error('Error deleting column', error);
    }
  };

  const openDeleteConfirmModal = () => {
    setIsVisible(false);
    setIsDeleteConfirmVisible(true);
  };

  return (
    <div>
      {isVisible && (
        <Modal
          isOpen={true}
          onClose={() => {
            setIsVisible(false);
            closeModal();
          }}
          width="540px"
          height="276px"
        >
          <h2 className="mb-32 text-2xl font-bold">컬럼 관리</h2>
          <p className="mb-10 h-21">이름</p>
          <input
            className="mb-28 rounded border-1px-solid-gray-30 sm:h-[42px] sm:w-[287px] md:h-[48px] md:w-[484px] lg:h-[48px] lg:w-[484px]"
            placeholder="컬럼 제목을 입력해주세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {isDuplicate && (
            <p className="absolute mt-[-20px] text-[14px] text-red">
              중복된 칼럼 이름입니다.
            </p>
          )}
          <div className="flex justify-between">
            <button
              onClick={openDeleteConfirmModal}
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600 underline"
            >
              삭제하기
            </button>
            <div className="flex">
              <button
                className="mr-[13px] btn_modal_large_white"
                onClick={() => {
                  setIsVisible(false);
                  closeModal();
                }}
              >
                취소
              </button>
              <button
                className="btn_modal_large_purple"
                onClick={handleEdit}
                disabled={isDuplicate}
              >
                변경
              </button>
            </div>
          </div>
        </Modal>
      )}
      {isDeleteConfirmVisible && (
        <Modal
          isOpen={true}
          onClose={() => {
            setIsDeleteConfirmVisible(false);
            setIsVisible(true);
          }}
          width="540px"
          height="250px"
        >
          <h2 className="font-pretendard flex h-full flex-col items-center justify-center text-center font-medium text-[18]">
            칼럼의 모든 카드가 삭제됩니다.
          </h2>
          <div className="mt-[-35px] flex justify-end gap-[12px]">
            <button
              className="btn_modal_large_white"
              onClick={() => {
                setIsDeleteConfirmVisible(false);
                setIsVisible(true);
              }}
            >
              취소
            </button>
            <button className="btn_modal_large_purple" onClick={handleDelete}>
              삭제
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EditColumnModal;
