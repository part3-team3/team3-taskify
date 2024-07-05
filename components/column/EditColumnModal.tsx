import Modal from '@/components/common/Modal';

const EditColumnModal = ({
  columnId,
  closeModal,
  onDelete,
}: {
  columnId: number;
  closeModal: () => void;
  onDelete: (columnId: number) => Promise<void>;
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
        className="mb-28 h-48 w-484 rounded px-16 py-16 border-1px-solid-gray-30"
        placeholder="컬럼 제목을 입력해주세요"
      />
      <div className="flex">
        <button
          onClick={() => onDelete(columnId)}
          className="flex flex-grow items-end text-gray-40 underline hover:text-violet-20"
        >
          삭제하기
        </button>
        <button onClick={closeModal} className="btn_modal_large_white">
          취소
        </button>
        <button className="ml-11 btn_modal_large_purple xl:ml-12">변경</button>
      </div>
    </Modal>
  );
};

export default EditColumnModal;
