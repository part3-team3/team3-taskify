import Modal from '@/components/common/Modal';
import { getColumn } from '@/pages/api/column/getColumn';
import React, { useEffect, useState } from 'react';

interface EditColumnModalProps {
  columnId: number;
  closeModal: () => void;
  onEditColumn: () => void;
  dashboardId: number;
  handleDeleteColumn: (columnId: number) => Promise<void>;
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

  useEffect(() => {
    setIsVisible(true);
  }, []);
  useEffect(() => {
    // inputValue로 중복체크
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
        // 현재 컬럼의 title 변경
        await updateColumnTitle(columnId, inputValue);
        localStorage.setItem('newColumnTitle', inputValue);
        onEditColumn();
        closeModal();
      } catch (error) {
        console.error('Error updating column title', error);
      }
    }
  };

  const updateColumnTitle = async (columnId: number, newTitle: string) => {
    try {
      // 서버에 컬럼 title 업데이트 요청
      await fetch(`/api/column/${columnId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });
    } catch (error) {
      console.error('Error updating column title', error);
      throw error;
    }
  };
  return (
    <div>
      {isVisible && (
        <Modal // Modal 컴포넌트에 넘겨주고 싶은 값을 prop으로 설정하기
          isOpen={true}
          onClose={() => setIsVisible(false)}
          width="540px"
          height="276px"
        >
          <h2 className="mb-32 text-2xl font-bold">컬럼 관리</h2>
          <p className="mb-10 h-21">이름</p>
          <input
            className="mb-28 rounded border-1px-solid-gray-30"
            placeholder="컬럼 제목을 입력해주세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex justify-between">
            <button
              onClick={() => {
                setIsVisible(false);
                handleDeleteColumn(columnId);
              }}
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600 underline"
            >
              삭제하기
            </button>
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
              onClick={handleEdit}
              disabled={isDuplicate}
            >
              변경
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EditColumnModal;
