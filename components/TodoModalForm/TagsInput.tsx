import { TodoFormData } from '@/types/ModalFormData';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from 'react';

import Tag from '../common/Tag';

const TagsInput = ({
  label,
  tags = [],
  placeholder,
  setFormData,
}: {
  label: string;
  tags?: string[];
  placeholder: string;
  setFormData?: Dispatch<SetStateAction<TodoFormData>>;
}) => {
  const [currentTags, setCurrentTags] = useState<string[]>(tags); // tags를 문자열로 변환하여 초기값 설정
  // ['a', 'b', 'c', 'd']
  const [newTagValue, setNewTagValue] = useState<string>('');

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTagValue(e.target.value);
  };

  const handleDeleteTag = (tagToDelete: string) => {
    const newTags = currentTags.filter((tag) => tag !== tagToDelete);

    setCurrentTags(newTags);

    setFormData?.((prev) => {
      return { ...prev, tags: newTags };
    });
  };

  const handleTagSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedValue = newTagValue.replace(/\s+/g, '');
    if (currentTags.includes(trimmedValue)) {
      window.alert('이미 존재하는 태그입니다');
      setNewTagValue('');
      return;
    }

    const newTags = [...currentTags, trimmedValue];

    // TagsInput component안의 태그들 업데이트
    setCurrentTags(newTags);

    // 카드 수정 모달 전체의 폼 데이터 태그 업데이트
    setFormData?.((prev) => {
      return { ...prev, tags: newTags };
    });
    setNewTagValue('');
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-4">
        <div className="text-16 font-medium leading-[19px] md:text-18 md:leading-[21px]">
          {label}
        </div>
      </div>

      <form onSubmit={handleTagSubmit}>
        <input
          value={newTagValue}
          onChange={handleTagChange}
          className="placeholder:gray-40 h-42 w-287 rounded-6 px-16 py-13 text-14 leading-[17px] border-1px-solid-gray-30 md:h-48 md:w-450 md:placeholder:text-16 md:placeholder:leading-[19px]"
          placeholder={placeholder}
        />
        <input className="hidden" type="submit" value="Submit" />
      </form>

      <div className="flex flex-wrap gap-4">
        {currentTags.map((tag, index) => (
          <Tag
            index={index}
            title={tag}
            key={`${tag}-${index}`}
            handleDeleteTag={handleDeleteTag}
          />
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
