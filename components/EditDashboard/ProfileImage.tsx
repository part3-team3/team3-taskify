import instance from '@/lib/axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const colors = [
  '#A3C4A2',
  '#F4D7DA',
  '#C4B1A2',
  '#9DD7ED',
  '#FFC85A',
  '#CBABDF',
  '#85CDE5',
];

const ProfileImage = () => {
  const [nickname, setNickname] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await instance.get(`/users/me`);
        setNickname(res.data.nickname);
        setProfileImageUrl(res.data.profileImageUrl);
        if (res.data.profileImageUrl === null) {
          //랜덤으로 배경 색상 지정
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          setBgColor(randomColor);
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchProfile();
  }, []);

  // 닉네임의 첫 글자 가져오기
  const firstLetter = nickname.charAt(0).toUpperCase();

  return (
    <div className="mx-auto mr-12 flex items-center justify-center">
      <div
        className="flex h-38 w-38 justify-center rounded-full text-sm text-white"
        style={{
          backgroundColor: profileImageUrl === null ? bgColor : 'transparent',
        }}
      >
        {profileImageUrl === null ? (
          <span className="flex items-center justify-center">
            {firstLetter}
          </span>
        ) : (
          <Image
            width={34}
            height={34}
            src={profileImageUrl}
            alt={nickname}
            className="flex h-34 w-34 justify-center rounded-full object-cover md:h-38 md:w-38"
          />
        )}
      </div>
    </div>
  );
};

export default ProfileImage;

/////
/////
/////
/////
