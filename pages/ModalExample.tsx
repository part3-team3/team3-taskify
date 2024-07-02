import { useState } from 'react';

import Modal from '../components/common/Modal';

const ModalTest: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 mb-4 rounded px-4 py-2 font-semibold text-black"
      >
        테스트 모달 열기
      </button>

      <Modal // Modal 컴포넌트에 넘겨주고 싶은 값을 prop으로 설정하기
        isOpen={isModalOpen}
        onClose={closeModal}
        width="500px"
        height="400px"
      >
        <h2 className="text-2xl font-bold">테스트 모달 제목입니다</h2>
        <p className="mt-4">테스트 모달 내용입니다~</p>

        <button className="btn_modal_large_white" onClick={closeModal}>취소</button>
        <button className="btn_modal_large_purple">생성</button>
      </Modal>
    </div>
  );
};

export default ModalTest;
