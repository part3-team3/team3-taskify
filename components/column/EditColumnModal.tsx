import Modal from '@/components/common/Modal';
import { Dispatch, SetStateAction } from 'react';

const EditColumnModal = ({
  columnId,
  closeModal,
  onEdit,
  onDelete,
  setModalInputValue,
}: {
  columnId: number;
  closeModal: () => void;
  onEdit: (columnId: number) => Promise<void>;
  onDelete: (columnId: number) => Promise<void>;
  setModalInputValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Modal // Modal 컴포넌트에 넘겨주고 싶은 값을 prop으로 설정하기
      isOpen={true}
      onClose={closeModal}
      width="540px"
      height="276px"
    >
      <h2 className="mb-32 text-2xl font-bold">컬럼 관리</h2>
      <p className="mb-10 h-21">이름</p>
      <input
        className="h-48 px-16 py-16 rounded mb-28 w-484 border-1px-solid-gray-30"
        placeholder="컬럼 제목을 입력해주세요"
        onChange={(e) => setModalInputValue(e.target.value)}
      />
      <div className="flex">
        <button
          onClick={() => onDelete(columnId)}
          className="flex items-end flex-grow underline text-gray-40 hover:text-violet-20"
        >
          삭제하기
        </button>
        <button onClick={closeModal} className="btn_modal_large_white">
          취소
        </button>
        <button
          onClick={() => onEdit(columnId)}
          className="ml-11 btn_modal_large_purple xl:ml-12"
        >
          변경
        </button>
      </div>
    </Modal>
  );
};

export default EditColumnModal;
