import EditModalData from '@/types/EditModalFormData';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface SelectOptionProps {
  type: 'status' | 'profile';
  option: {
    id: number;
    title?: string;
    nickname?: string;
    profileImageUrl?: string;
  };
  setData: Dispatch<SetStateAction<EditModalData>>;
  setSelectedUser: Dispatch<SetStateAction<string | null>>;
  setselectedTags: Dispatch<SetStateAction<string | null>>;
}

const SelectOption = ({
  type,
  option,
  setData,
  setSelectedUser,
  setselectedTags,
}: SelectOptionProps) => {
  const { title, nickname, profileImageUrl } = option;

  console.log(option);
  const handleSelectChange = () => {
    if (type === 'profile' && nickname && profileImageUrl) {
      setSelectedUser({ nickname, profileImageUrl });
      setData((prev) => ({ ...prev, assigneeUserId: option.id }));
    } else if (type === 'status' && title) {
      setData((prev) => ({ ...prev, columnId: option.id }));
      setselectedTags(title);
    }
  };

  return (
    <div className="flex" onClick={handleSelectChange}>
      <Image
        width={22}
        height={22}
        src="/images/icon/ic-dropdown-check.svg"
        alt="드롭다운 체크 아이콘"
      />
      {type === 'status' && (
        <div className="flex h-max w-max gap-6 rounded-11 bg-violet-10 px-8 py-4 text-12 leading-[14px] text-violet-20">
          <Image
            width={6}
            height={6}
            src="/images/icon/ic-dot-purple.svg"
            alt="상태 드롭다운 색상 아이콘"
          />
          <div>{title}</div>
        </div>
      )}
      {type === 'profile' && (
        <div className="flex h-max w-max items-center gap-6 rounded-11 px-8 py-4 text-12 leading-[14px]">
          <Image
            className="rounded-[50px]"
            width={26}
            height={26}
            src={profileImageUrl}
            alt="담당자 프로필 이미지"
          />
          <div className="text-16 leading-[19px] text-black-20">{nickname}</div>
        </div>
      )}
    </div>
  );
};

export default SelectOption;
