import axios from '@/lib/axios';
import { useEffect, useState } from 'react';

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
  profileImageUrl: string | null;
  isOwner: boolean;
}

interface MembersImageProps {
  dashboardId: number;
}

const MAX_DESKTOP_MEMBERS = 4;
const MAX_MOBILE_MEMBERS = 2;

const MembersImage = ({ dashboardId }: MembersImageProps) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [extraCount, setExtraCount] = useState(0);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!dashboardId || isNaN(Number(dashboardId))) return;
      try {
        const res = await axios.get(`/members`, {
          params: {
            dashboardId,
          },
        });

        const filteredMembers = res.data.members; // 필터링 조건 제거

        setMembers(filteredMembers);
        setExtraCount(
          filteredMembers.length > MAX_DESKTOP_MEMBERS
            ? filteredMembers.length - MAX_DESKTOP_MEMBERS
            : 0,
        );
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchMembers();
  }, [dashboardId]);

  const renderMember = (member: Member, index: number) => {
    const firstLetter = member.nickname.charAt(0).toUpperCase();
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
      <div
        key={index}
        className={`flex h-34 w-34 items-center justify-center rounded-full text-sm text-white sm:h-34 sm:w-34 md:h-38 md:w-38 ${index !== 0 ? '-ml-8' : ''}`}
        style={{
          backgroundColor: member.profileImageUrl ? 'transparent' : randomColor,
        }}
      >
        {member.profileImageUrl ? (
          <img
            src={member.profileImageUrl}
            alt={member.nickname}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <span className="flex items-center justify-center">
            {firstLetter}
          </span>
        )}
      </div>
    );
  };

  const displayedMembers = members.slice(0, MAX_DESKTOP_MEMBERS);
  const displayedMembersForMobile = members.slice(0, MAX_MOBILE_MEMBERS);

  return (
    <div className="mx-auto flex items-center justify-center">
      <div className="hidden sm:flex">
        {displayedMembers.map((member, index) => renderMember(member, index))}
        {extraCount > 0 && (
          <div
            className="-ml-2 flex h-34 w-34 items-center justify-center rounded-full text-sm text-white sm:h-34 sm:w-34 md:h-38 md:w-38"
            style={{
              backgroundColor:
                colors[Math.floor(Math.random() * colors.length)],
            }}
          >
            <span className="flex items-center justify-center">
              +{extraCount}
            </span>
          </div>
        )}
      </div>
      <div className="flex sm:hidden">
        {displayedMembersForMobile.map((member, index) =>
          renderMember(member, index),
        )}
      </div>
    </div>
  );
};

export default MembersImage;
