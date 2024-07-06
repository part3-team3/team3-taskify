import Modal from '@/components/common/Modal';
import { getColumn } from '@/pages/api/column/getColumn';
import React, { useEffect, useState } from 'react';

interface NewColumnModalProps {
  closeModal: () => void;
  onAddColumn: () => void;
  dashboardId: number;
}

interface ColumnType {
  title: string;
}

const NewColumnModal: React.FC<NewColumnModalProps> = ({
  closeModal,
  onAddColumn,
  dashboardId,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

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

  const handleCreate = () => {
    if (!isDuplicate) {
      localStorage.setItem('newColumnTitle', inputValue);
      onAddColumn();
    }
  };

  return (
    <Modal isOpen={true} onClose={closeModal} width="540px" height="276px">
      <h2 className="mb-32 text-2xl font-bold">컬럼 관리</h2>
      <p className="mb-10 h-21">이름</p>
      <div className="relative">
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
      </div>
      <div className="flex justify-end gap-[12px]">
        <button className="btn_modal_large_white" onClick={closeModal}>
          취소
        </button>
        <button
          className="btn_modal_large_purple"
          onClick={handleCreate}
          disabled={isDuplicate}
        >
          생성
        </button>
      </div>
    </Modal>
  );
};

export default NewColumnModal;
