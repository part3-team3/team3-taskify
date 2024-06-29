import useMediaQuery from '@/hooks/useMediaQuery';
import putTodoEditModal from '@/pages/api/TodoEditModal/putTodoEditModal';
import FormData from '@/types/EditModalFormData';
import { Card } from '@/types/card';
import { useState } from 'react';

import StatusDropdown from '../common/StatusDropdown';
import DateInput from './DateInput';
import FileInput from './FileInput';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';

const TodoEditModal = ({ card }: { card: Card }) => {
  const { assignee, columnId, title, description, dueDate, tags, imageUrl } =
    card;

  const [formData, setFormData] = useState<FormData>({
    columnId,
    assigneeUserId: assignee.id,
    title,
    description,
    dueDate,
    tags, // 태그 입력 후 엔터 누르면 등록됨
    imageUrl,
  });

  const isMobile = useMediaQuery('(max-width: 767px)');

  // useEffect(() => {
  //   const loadColumns = async () => {
  //     const tagsData = await getColumns();
  //     const assigneeData = await getMembers();
  //     // console.log(assigneeData);
  //     setAssigneeUserData(assigneeData);
  //     setFormData((prevForm) => {
  //       return {
  //         ...prevForm,
  //         tags: tagsData,
  //         assigneeUserId: assigneeData[0].id,
  //       };
  //     });
  //   };
  //   loadColumns();
  // }, []);

  const onSubmit = async () => {
    const result = await putTodoEditModal(formData);
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
        <Select
          type="profile"
          options={[]}
          setFormData={setFormData}
          placeholder="이름을 입력해 주세요"
        >
          담당자
        </Select>
      </div>
      <Input
        essential="*"
        setFormData={setFormData}
        placeholder="제목을 입력해 주세요"
      >
        제목
      </Input>
      <Textarea
        essential="*"
        setFormData={setFormData}
        placeholder="설명을 입력해 주세요"
      >
        설명
      </Textarea>
      <DateInput placeholder="날짜를 입력해 주세요">마감일</DateInput>
      <Input placeholder="입력 후 Enter">태그</Input>
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
