import Modal from '@/components/common/Modal';
import useColumnTitleDuplicateChecker from '@/hooks/useColumnTitleDuplicateChecker';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useState } from 'react';

const NewColumnModal = ({
  handleAddColumn,
  closeModal,
  dashboardId,
}: {
  handleAddColumn: (title: string) => Promise<void>;
  closeModal: () => void;
  dashboardId: number;
}) => {
  const [inputValue, setInputValue] = useState('');

  const isDuplicate = useColumnTitleDuplicateChecker(dashboardId, inputValue);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isCreateColumnModalDisabled = inputValue.trim() === '' ? true : false;

  return (
    <Modal
      isOpen={true}
      onClose={closeModal}
      width={isMobile ? '327px' : '540px'}
      height={isMobile ? '241px' : '276px'}
    >
      <h2 className="mb-32 text-20 font-bold leading-[24px] text-black-20 md:text-24 md:leading-[29px]">
        새 컬럼 생성
      </h2>
      <p className="mb-10 h-21">이름</p>
      <div className="relative">
        <input
          className={`mb-28 h-42 w-287 rounded border border-solid border-[#D9D9D9] p-16 md:h-48 md:w-484 ${
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
        <button
          className="btn_modal_small_white md:btn_modal_large_white"
          onClick={closeModal}
        >
          취소
        </button>
        <button
          className={`${isCreateColumnModalDisabled ? 'btn_modal_small_gray md:btn_modal_large_gray' : 'btn_modal_small_purple md:btn_modal_large_purple'} `}
          onClick={() => handleAddColumn(inputValue)}
          disabled={isDuplicate || !inputValue}
        >
          생성
        </button>
      </div>
    </Modal>
  );
};

export default NewColumnModal;
