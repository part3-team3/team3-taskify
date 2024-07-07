import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import React from 'react';

const getInitials = (name: string) => {
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
  '#B0D8A4',
];

interface Member {
  nickname: string;
  profileImageUrl: string | null | StaticImport;
  id: number;
}

interface MembersListProps {
  members: Member[];
  onDeleteMember: (id: number) => void;
}

const MembersList: React.FC<MembersListProps> = ({
  members,
  onDeleteMember,
}) => {
  const [assignedColors, setAssignedColors] = useState<string[]>([]);

  useEffect(() => {
    setAssignedColors(shuffleArray([...colors]));
  }, []);

  return (
    <div>
      {members.map((member, index) => {
        const color = assignedColors[index % assignedColors.length];
        return (
          <div
            key={member.id}
            className="flex flex-row items-center gap-12 border-b border-gray-200 py-12 md:py-16"
          >
            {member.profileImageUrl ? (
              <div className="h-34 w-34 overflow-hidden rounded-full md:h-38 md:w-38">
                <Image
                  src={member.profileImageUrl}
                  alt={`${member.nickname}'s profile image`}
                  width={38}
                  height={38}
                  className="h-full w-full rounded-full"
                />
              </div>
            ) : (
              <div
                className="flex h-34 w-34 items-center justify-center rounded-full md:h-38 md:w-38"
                style={{ backgroundColor: color }}
              >
                <span className="text-14 font-bold text-white md:text-16">
                  {getInitials(member.nickname)}
                </span>
              </div>
            )}
            <span className="ml-4">{member.nickname}</span>
            <button
              className="ml-auto font-medium btn_small_white md:btn_desktop_white"
              onClick={() => onDeleteMember(member.id)}
            >
              삭제
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MembersList;
