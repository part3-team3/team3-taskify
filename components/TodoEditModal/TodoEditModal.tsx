import useMediaQuery from '@/hooks/useMediaQuery';
import { useState } from 'react';

import DateInput from './DateInput';
import FileInput from './FileInput';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';

const TodoEditModal = () => {
  const [inputValue, setInputValue] = useState({});
  const isMobile = useMediaQuery('(max-width: 767px)');

  const statusOptions = ['To Do', 'On Progress', 'Done'];
  const ownerOptions = ['이영훈', '주강산', '이승헌', '이대양이'];

  return (
    <div className="flex flex-col gap-24 md:gap-32">
      <div className="text-20 font-bold leading-[24px]">할일 수정</div>
      <div className={`${isMobile ? 'flex flex-col gap-24' : 'flex gap-16'}`}>
        <Select
          type="tags"
          options={statusOptions}
          placeholder="상태를 설정해 주세요"
        >
          상태
        </Select>
        <Select
          type="profile"
          options={ownerOptions}
          placeholder="이름을 입력해 주세요"
        >
          담당자
        </Select>
      </div>
      <Input essential="*" placeholder="제목을 입력해 주세요">
        제목
      </Input>
      <Textarea essential="*" placeholder="설명을 입력해 주세요">
        설명
      </Textarea>
      <DateInput placeholder="날짜를 입력해 주세요">마감일</DateInput>
      <Input placeholder="입력 후 Enter">입력</Input>
      <FileInput />
      <div className="flex gap-12 md:justify-end">
        <button className="btn_modal_small_white md:btn_modal_large_white">
          취소
        </button>
        <button className="btn_modal_small_purple md:btn_modal_large_purple">
          수정
        </button>
      </div>
    </div>
  );
};

export default TodoEditModal;
