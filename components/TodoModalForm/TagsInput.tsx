import { TodoCreateFormData, TodoFormData } from '@/types/ModalFormData';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

const TagsInput = ({
  label,
  tags = [],
  placeholder,
  setFormData,
  setCreateFormData,
}: {
  label: string;
  tags?: string[];
  placeholder: string;
  setFormData?: Dispatch<SetStateAction<TodoFormData>>;
  setCreateFormData?: Dispatch<SetStateAction<TodoCreateFormData>>;
}) => {
  const [currentTags, setCurrentTags] = useState<string>(tags.join(', ')); // tags를 문자열로 변환하여 초기값 설정

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTags = e.target.value.split(',').map((tag) => tag.trim());
    setCurrentTags(e.target.value); // inputValue 업데이트

    setFormData?.((prev) => {
      return { ...prev, tags: newTags };
    });
    setCreateFormData?.((prev) => {
      return { ...prev, tags: newTags };
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-4">
        <div className="text-16 font-medium leading-[19px] md:text-18 md:leading-[21px]">
          {label}
        </div>
      </div>

      <input
        value={currentTags} // 상태를 직접 관리
        onChange={handleTitleChange}
        className="placeholder:gray-40 h-42 w-287 rounded-6 px-16 py-13 text-14 leading-[17px] border-1px-solid-gray-30 md:h-48 md:w-450"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TagsInput;
