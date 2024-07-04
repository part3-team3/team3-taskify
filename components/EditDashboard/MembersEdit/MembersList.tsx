import Image from 'next/image';
import { useEffect, useState } from 'react';

const getInitials = (name) => {
  return name ? name[0] : '';
};

const MembersList = ({ members }) => {
  return (
    <div>
      {members.map((member, index) => (
        <div key={index} className="mb-4 flex flex-row items-center">
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
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300"
              style={{
                backgroundColor:
                  '#' + Math.floor(Math.random() * 16777215).toString(16),
              }}
            >
              <span className="text-lg font-bold text-white">
                {getInitials(member.nickname)}
              </span>
            </div>
          )}
          <span className="ml-4">{member.nickname}</span>
        </div>
      ))}
    </div>
  );
};

export default MembersList;
