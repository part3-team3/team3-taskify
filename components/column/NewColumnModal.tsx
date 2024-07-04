import Modal from '@/components/common/Modal';
import { addColumn } from '@/pages/api/column/addColumn';
import { getColumnList } from '@/pages/api/column/getColumnList';
import React, { useEffect, useState } from 'react';

interface NewColumnModalProps {
  closeModal: () => void;
  onAddColumn: () => void;
  dashboardId: number;
}

const NewColumnModal: React.FC<NewColumnModalProps> = ({
  closeModal,
  onAddColumn,
  dashboardId,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // inputValue가 변경될 때마다 DupliChecker를 호출합니다.
    const checkDuplicate = async () => {
      try {
        const columns = await DupliChecker(dashboardId);
        const isDuplicated = columns.some(
          (column) => column.title === inputValue,
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
      const response = await getColumnList(dashboardId.toString());
      return response.data;
    } catch (error) {
      console.error('Failed to fetch column list', error);
      throw error;
    }
  };

  const handleCreate = () => {
    if (!isDuplicate) {
      localStorage.setItem('newColumnTitle', inputValue);
      onAddColumn(); // 컬럼 추가 함수 호출
      closeModal(); // 모달 닫기
      // handleAddColumn();
    }
  };
  // const handleAddColumn = async () => {
  //   try {
  //     const response = await addColumn(inputValue);
  //     if (response.success) {
  //       // 컬럼 추가 성공 시 수행할 작업
  //       console.log('Column added successfully');
  //     } else {
  //       // 컬럼 추가 실패 시 수행할 작업
  //       console.error('Failed to add column');
  //     }
  //   } catch (error) {
  //     console.error('Error adding column:', error);
  //   }
  // };
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
            className="mb-28 rounded border-1px-solid-gray-30 sm:h-[42px] sm:w-[287px] md:h-[48px] md:w-[484px] lg:h-[48px] lg:w-[484px]"
            placeholder="컬럼 제목을 입력해주세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {isDuplicate && <p className="text-red-500">중복된 제목입니다.</p>}
          <div className="flex justify-between">
            <button
              className="btn_modal_large_white"
              onClick={() => {
                setIsVisible(false);
                window.location.reload();
              }}
            >
              취소
            </button>
            <button
              className="btn_modal_large_purple"
              onClick={handleCreate}
              disabled={isDuplicate} // 중복 시 버튼 비활성화
            >
              생성
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NewColumnModal;
