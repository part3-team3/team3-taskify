import instance from '@/lib/axios';
import clsx from 'clsx';
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

const MAX_DESKTOP_MEMBERS = 4;
const MAX_MOBILE_MEMBERS = 2;

const MembersImage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [extraCount, setExtraCount] = useState(0);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await instance.get('members');
        console.log('API Response:', res.data);
        const filteredMembers = res.data.members.filter(
          (member: Member) => !member.isOwner,
        );
        console.log('Filtered Members:', filteredMembers);

        if (filteredMembers.length > MAX_DESKTOP_MEMBERS) {
          setExtraCount(filteredMembers.length - MAX_DESKTOP_MEMBERS);
        }

        setMembers(filteredMembers);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchMembers();
  }, []);

  const renderMember = (member: Member, index: number) => {
    const firstLetter = member.nickname.charAt(0).toUpperCase();
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    console.log('Rendering member:', member); // Add this line to log each member being rendered

    return (
      <div
        key={index}
        className={clsx(
          'flex items-center justify-center rounded-full text-sm text-white',
          {
            'sm:h-34 sm:w-34 md:h-38 md:w-38': true,
            'h-34 w-34': true, // Add mobile size
            '-ml-2': index !== 0,
          },
        )}
        style={{
          backgroundColor: member.profileImageUrl ? 'transparent' : randomColor,
        }}
      >
        {member.profileImageUrl ? (
          <img
            src={member.profileImageUrl}
            alt={member.nickname}
            className="h-full w-full rounded-full"
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
            className={clsx(
              'flex items-center justify-center rounded-full text-sm text-white',
              {
                'sm:h-34 sm:w-34 md:h-38 md:w-38': true,
                'h-34 w-34': true, // Add mobile size
                '-ml-2': true,
              },
            )}
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

///
///
///
///