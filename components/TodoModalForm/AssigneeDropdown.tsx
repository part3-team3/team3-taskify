import getMembers from '@/pages/api/TodoModalForm/getMembers';
import { TodoFormData } from '@/types/ModalFormData';
import { User } from '@/types/card';
import Member from '@/types/member';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const Option = ({
  user,
  isSelected,
  handleSelectOption,
}: {
  user: Member;
  isSelected?: boolean;
  handleSelectOption?: (user: Member) => void;
}) => {
  const handleOptionClick = () => {
    handleSelectOption?.(user);
  };

  const addLeftMargin = isSelected === false;

  return (
    <div className="flex gap-6" onClick={handleOptionClick}>
      {isSelected && (
        <Image
          width={22}
          height={22}
          src="/images/icon/ic-dropdown-check.svg"
          alt="드롭다운 체크 아이콘"
        />
      )}
      <div
        className={`flex h-max w-max items-center gap-6 rounded-11 py-4 text-12 leading-[14px] ${addLeftMargin ? 'ml-28' : ''}`}
      >
        {user.profileImageUrl ? (
          <div className="relative h-26 w-26">
            <Image
              className="rounded-[70%] object-cover"
              fill
              src={user.profileImageUrl}
              alt="담당자 프로필 이미지"
            />
          </div>
        ) : (
          <div className="h-26 w-26 rounded-full bg-violet-20 text-12 font-semibold leading-[15px] text-white flex-center">
            {user.nickname.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="text-14 leading-[17px] text-black-20">
          {user.nickname}
        </div>
      </div>
    </div>
  );
};

const AssigneeDropdown = ({
  label,
  assignee,
  dashboardId,
  setFormData,
}: {
  label: string;
  assignee?: User;
  dashboardId: number;
  setFormData?: Dispatch<SetStateAction<TodoFormData>>;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [membersData, setMembersData] = useState<Member[]>([]);
  const [selectedUser, setSelectedUser] = useState<Member>();

  useEffect(() => {
    const loadMembers = async () => {
      const members = await getMembers(dashboardId);
      const currentMember = members.find((member: Member) => {
        return member.userId === assignee?.id;
      });
      setSelectedUser(currentMember);
      setMembersData(members);
    };
    loadMembers();
  }, []);

  const handleDropdownVisible = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectOption = (user: Member) => {
    setSelectedUser(user);

    setFormData?.((prev) => ({ ...prev, assigneeUserId: user.userId }));
  };

  return (
    <div>
      <div className="flex flex-col gap-10">
        <div className="text-16 font-medium leading-[19px] md:text-18 md:leading-[21px]">
          {label}
        </div>
        <div>
          <div
            onClick={handleDropdownVisible}
            className="relative flex items-center px-16 h-42 w-287 rounded-6 py-13 border-1px-solid-gray-30 md:h-48 md:w-217"
          >
            {selectedUser ? (
              <Option user={selectedUser} />
            ) : (
              <div className="text-14 leading-[17px] text-gray-40 md:text-16 md:leading-[19px]">
                이름을 입력해 주세요
              </div>
            )}
          </div>
          <div className="relative">
            <Image
              className="absolute bottom-8 right-8 md:bottom-10"
              src="/images/icon/ic-arrow-dropdown.svg"
              width={26}
              height={26}
              alt="드롭다운화살표"
            />
          </div>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="absolute z-10 flex flex-col px-8 mt-2 bg-white h-max w-287 gap-13 rounded-6 py-13 border-1px-solid-gray-30 md:w-217">
          {membersData?.map((user) => (
            <div key={user.id}>
              <Option
                user={user}
                handleSelectOption={handleSelectOption}
                isSelected={user.userId === selectedUser?.userId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssigneeDropdown;
