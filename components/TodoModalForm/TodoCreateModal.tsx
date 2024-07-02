import useMediaQuery from '@/hooks/useMediaQuery';
import postCreateCard from '@/pages/api/TodoModalForm/postCreateCard';
import { TodoCreateFormData } from '@/types/ModalFormData';
import getCardModalSize from '@/utils/getCardModalSize';
import { useState } from 'react';

import Modal from '../common/Modal';
import AssigneeDropdown from './AssigneeDropdown';
import DateInput from './DateInput';
import FileInput from './FileInput';
import Input from './Input';
import TagsInput from './TagsInput';
import Textarea from './Textarea';

const TodoCreateModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [createFormData, setCreateFormData] = useState<TodoCreateFormData>({
    assigneeUserId: 0,
    dashboardId: 0,
    columnId: 0,
    title: '',
    description: '',
    dueDate: '',
    tags: [],
    imageUrl: '',
  });

  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const { modalWidth } = getCardModalSize({
    isTablet,
    isDesktop,
    isFormModal: true,
  });

  const isMobile = useMediaQuery('(max-width: 767px)');

  const onSubmit = async () => {
    await postCreateCard(createFormData);
  };

  return (
    <div className="px-20 py-40 md:px-28 md:py-32">
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 mb-4 rounded px-4 py-2 font-semibold text-black"
      >
        테스트 모달 열기
      </button>
      <Modal
        width={modalWidth}
        height={'auto'}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <div className="flex flex-col gap-24 md:gap-32">
          <div className="text-20 font-bold leading-[24px]">할일 생성</div>
          <div
            className={`${isMobile ? 'flex flex-col gap-24' : 'flex gap-16'}`}
          >
            <AssigneeDropdown
              label="담당자"
              setCreateFormData={setCreateFormData}
            />
          </div>
          <Input
            label="제목"
            essential="*"
            setCreateFormData={setCreateFormData}
            placeholder="제목을 입력해 주세요"
          />
          <Textarea
            label="설명"
            placeholder="설명을 입력해 주세요"
            essential="*"
            setCreateFormData={setCreateFormData}
          />

          <DateInput label="마감일" setCreateFormData={setCreateFormData} />
          <TagsInput
            label="태그"
            placeholder="입력 후 Enter"
            setCreateFormData={setCreateFormData}
          />
          <FileInput setCreateFormData={setCreateFormData} />
          <div className="flex gap-12 md:justify-end">
            <button className="btn_modal_small_white md:btn_modal_large_white">
              취소
            </button>
            <button
              onClick={onSubmit}
              className="btn_modal_small_purple md:btn_modal_large_purple"
            >
              생성
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TodoCreateModal;
