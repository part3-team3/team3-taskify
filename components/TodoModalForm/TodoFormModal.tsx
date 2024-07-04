import AssigneeDropdown from '@/components/TodoModalForm/AssigneeDropdown';
import DateInput from '@/components/TodoModalForm/DateInput';
import FileInput from '@/components/TodoModalForm/FileInput';
import Input from '@/components/TodoModalForm/Input';
import Textarea from '@/components/TodoModalForm/Textarea';
import useMediaQuery from '@/hooks/useMediaQuery';
import postCreateCard from '@/pages/api/TodoModalForm/postCreateCard';
import putTodoEditModal from '@/pages/api/TodoModalForm/putTodoEditModal';
import { TodoFormData } from '@/types/ModalFormData';
import { Card } from '@/types/card';
import { Dispatch, SetStateAction, useState } from 'react';

import StatusDropdown from './StatusDropdown';
import TagsInput from './TagsInput';

const TodoFormModal = ({
  card,
  isInEdit,
  setIsInEdit,
  setIsModalOpen,
}: {
  card?: Card;
  isInEdit?: boolean;
  setIsInEdit?: Dispatch<SetStateAction<boolean>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const isEditForm = Boolean(card); // true or false

  const {
    assignee = undefined,
    columnId = 0,
    title = '',
    description = '',
    dueDate = '',
    tags = [],
    imageUrl = '',
  } = card || {};

  const defaultData: TodoFormData = {
    columnId,
    assigneeUserId: assignee?.id || 0,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  };

  if (!isEditForm) {
    defaultData.dashboardId = 0;
  }

  const [formData, setFormData] = useState<TodoFormData>(defaultData);

  const isMobile = useMediaQuery('(max-width: 767px)');

  const onSubmit = async () => {
    if (isEditForm) {
      await putTodoEditModal(formData);
      setIsInEdit?.(false);
    } else {
      await postCreateCard(formData);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const isEditModalButtonDisabled =
    (formData.title && formData.description).trim() === '' ? true : false;

  return (
    <div className="flex flex-col gap-24 md:gap-32">
      <div className="text-20 font-bold leading-[24px]">
        {isEditForm ? '할일 수정' : '할일 생성'}
      </div>
      <div className={`${isMobile ? 'flex flex-col gap-24' : 'flex gap-16'}`}>
        {isEditForm && (
          <StatusDropdown
            label="상태"
            columnId={columnId}
            setFormData={setFormData}
          />
        )}
        <AssigneeDropdown
          label="담당자"
          assignee={assignee}
          setFormData={setFormData}
        />
      </div>
      <Input
        label="제목"
        title={title}
        essential="*"
        setFormData={setFormData}
        placeholder="제목을 입력해 주세요"
      />
      <Textarea
        label="설명"
        placeholder="설명을 입력해 주세요"
        description={description}
        essential="*"
        setFormData={setFormData}
      />

      <DateInput
        label="마감일"
        date={dueDate}
        setFormData={setFormData}
      ></DateInput>
      <TagsInput
        label="태그"
        placeholder="입력 후 Enter"
        tags={tags}
        setFormData={setFormData}
      />
      <FileInput setFormData={setFormData} />
      <div className="flex gap-12 md:justify-end">
        <button
          onClick={handleModalClose}
          className="btn_modal_small_white md:btn_modal_large_white"
        >
          취소
        </button>
        <button
          onClick={onSubmit}
          disabled={isInEdit && isEditModalButtonDisabled ? true : false}
          className={`${isInEdit && isEditModalButtonDisabled ? 'btn_modal_small_gray md:btn_modal_large_gray' : 'btn_modal_small_purple md:btn_modal_large_purple'}`}
        >
          {isEditForm ? '수정' : '생성'}
        </button>
      </div>
    </div>
  );
};

export default TodoFormModal;
