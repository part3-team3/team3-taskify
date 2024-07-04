import Image from 'next/image';
import { useEffect, useState } from 'react';
import React from 'react';

const getInitials = (name) => {
  return name ? name[0] : '';
};

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const colors = [
  '#A3C4A2',
  '#F4D7DA',
  '#C4B1A2',
  '#9DD7ED',
  '#FFC85A',
  '#CBABDF',
];

interface Member {
  nickname: string;
  profileImage: string | null;
  id: number;
}

interface MembersListProps {
  members: Member[];
  onDeleteMember: (id: number) => void;
}
const MembersList = (React.FC<MembersListProps> = ({
  members,
  onDeleteMember,
}) => {
  const [assignedColors, setAssignedColors] = useState<string[]>([]);

  useEffect(() => {
    setAssignedColors(shuffleArray([...colors]));
  }, [members]);

  return (
    <div>
      {members.map((member, index) => {
        const color = assignedColors[index % assignedColors.length];
        return (
          <div
            key={index}
            className="flex flex-row items-center gap-12 border-b border-gray-200 pb-16 pt-16"
          >
            {member.profileImage ? (
              <Image
                src={member.profileImage}
                alt={`${member.nickname}'s profile image`}
                width={50}
                height={50}
                className="rounded-full"
              />
            ) : (
              <div
                className="flex h-38 w-38 items-center justify-center rounded-full"
                style={{ backgroundColor: color }}
              >
                <span className="text-lg font-bold text-white">
                  {getInitials(member.nickname)}
                </span>
              </div>
            )}
            <span className="ml-4">{member.nickname}</span>
            <button
              className="md: ml-auto font-medium btn_desktop_white"
              onClick={() => onDeleteMember(member.id)}
            >
              삭제
            </button>
          </div>
        );
      })}
    </div>
  );
});

export default MembersList;
