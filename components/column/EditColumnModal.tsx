import Modal from '@/components/common/Modal';
import React, { useEffect, useState } from 'react';

interface AddColumnModalProps {
  columnId: number;
  handleDeleteColumn: (columnId: number) => Promise<void>;
}

const AddColumnModal: React.FC<AddColumnModalProps> = ({
  handleDeleteColumn,
  columnId,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
            className="mb-28 rounded border-1px-solid-gray-30 sm:h-[42px] sm:w-[287px] md:h-[48px] md:w-[484px] lg:h-[48px] lg:w-[484px]"
            placeholder="컬럼 제목을 입력해주세요"
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
            <button className="btn_modal_large_purple">변경</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddColumnModal;
