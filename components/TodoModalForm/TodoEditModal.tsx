import DateInput from '@/components/TodoModalForm/DateInput';
import FileInput from '@/components/TodoModalForm/FileInput';
import Input from '@/components/TodoModalForm/Input';
import Textarea from '@/components/TodoModalForm/Textarea';
import useMediaQuery from '@/hooks/useMediaQuery';
import putTodoEditModal from '@/pages/api/TodoModalForm/putTodoEditModal';
import TodoFormData from '@/types/EditModalFormData';
import { Card } from '@/types/card';
import { Dispatch, SetStateAction, useState } from 'react';

import AssigneeDropdown from './AssigneeDropdown';
import StatusDropdown from './StatusDropdown';
import TagsInput from './TagsInput';

const TodoEditModal = ({
  card,
  setIsInEdit,
}: {
  card: Card;
  setIsInEdit: Dispatch<SetStateAction<boolean>>;
}) => {
  const { assignee, columnId, title, description, dueDate, tags, imageUrl } =
    card;

  const [formData, setFormData] = useState<TodoFormData>({
    columnId,
    assigneeUserId: assignee.id,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  });

  const isMobile = useMediaQuery('(max-width: 767px)');

  const onSubmit = async () => {
    const result = await putTodoEditModal(formData);
    setIsInEdit(false);
    console.log(result);
  };

  return (
    <div className="flex flex-col gap-24 md:gap-32">
      <div className="text-20 font-bold leading-[24px]">할일 수정</div>
      <div className={`${isMobile ? 'flex flex-col gap-24' : 'flex gap-16'}`}>
        <StatusDropdown
          label="상태"
          columnId={columnId}
          setFormData={setFormData}
        />
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
        <button className="btn_modal_small_white md:btn_modal_large_white">
          취소
        </button>
        <button
          onClick={onSubmit}
          className="btn_modal_small_purple md:btn_modal_large_purple"
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default TodoEditModal;
