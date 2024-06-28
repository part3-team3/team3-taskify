import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const SelectOption = ({
  type,
  option,
  setSelect,
}: {
  type: string;
  option: string;
  setSelect: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex">
      <Image
        width={22}
        height={22}
        src="/images/icon/ic-dropdown-check.svg"
        alt="드롭다운 체크 아이콘"
      />
      {type === 'tags' && (
        <div className="flex h-max w-max gap-6 rounded-11 bg-violet-10 px-8 py-4 text-12 leading-[14px] text-violet-20">
          <Image
            width={6}
            height={6}
            src="/images/icon/ic-dot-purple.svg"
            alt="상태 드롭다운 색상 아이콘"
          />
          <div>{option}</div>
        </div>
      )}
      {type === 'profile' && (
        <div className="flex h-max w-max items-center gap-6 rounded-11 px-8 py-4 text-12 leading-[14px]">
          <Image
            width={26}
            height={26}
            src="/images/icon/younghoon.svg"
            alt="담당자 프로필 이미지"
          />
          <div className="text-16 leading-[19px] text-black-20">{option}</div>
        </div>
      )}
    </div>
  );
};

export default SelectOption;
