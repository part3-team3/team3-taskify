import ChangePassword from '@/components/Mypage/ChangePassword';
import ProfileChange from '@/components/Mypage/ProfileChange';
import SideBar from '@/components/sidebar/SideBar';
import instance from '@/lib/axios';
import arrow from '@/public/images/icon/ic-on-arrow-left.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const colors = [
  '#A3C4A2',
  '#F4D7DA',
  '#C4B1A2',
  '#9DD7ED',
  '#FFC85A',
  '#CBABDF',
];

const MyPage = () => {
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bgColor, setBgColor] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await instance.get('/users/me'); // 실제 API 엔드포인트에 맞게 수정
        setNickname(res.data.nickname);
        setProfileImage(res.data.profileImageUrl);

        // 프로필 이미지가 null일 때만 랜덤 배경색 설정
        if (res.data.profileImageUrl === null) {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          setBgColor(randomColor);
        } else {
          setBgColor(''); // 프로필 이미지가 있는 경우 배경색은 비워둠
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const firstLetter = nickname.charAt(0).toUpperCase();

  return (
    <div className="relative text-black-20">
      <div className="flex h-60 w-full items-center justify-end border-b border-gray-30 pl-67 md:h-70 md:pl-160 md:pr-40 xl:justify-between xl:pl-300 xl:pr-80">
        <div className="hidden pl-40 text-20 font-bold xl:block">계정관리</div>
        <div className="flex items-center gap-12 pr-13">
          <div className="h-34 w-34 rounded-50 sm:h-38 sm:w-38">
            <div
              className="flex h-34 w-34 shrink-0 justify-center rounded-full text-sm text-white sm:h-38 sm:w-38"
              style={{
                backgroundColor:
                  profileImage === null ? bgColor : 'transparent',
              }}
            >
              {profileImage === null ? (
                <span className="flex items-center justify-center">
                  {firstLetter}
                </span>
              ) : (
                profileImage && (
                  <Image
                    width={34}
                    height={34}
                    src={profileImage}
                    alt={nickname}
                    className="h-full w-full rounded-full object-cover"
                  />
                )
              )}
            </div>
          </div>

          <div className="hidden sm:block">{nickname}</div>
        </div>
      </div>
      <div className="absolute left-0 top-0">
        <SideBar />
      </div>
      <div className="pl-65 md:pl-160 xl:pl-300">
        <div className="px-12 md:px-20">
          <div className="flex cursor-pointer gap-4 pt-15">
            <Image
              className="h-20 w-20 md:h-24 md:w-24"
              src={arrow}
              alt="returnarrow"
              onClick={() => router.back()}
            />
            <div
              className="text-cente text-14 hover:underline md:text-16"
              onClick={() => router.back()}
            >
              돌아가기
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <ProfileChange />
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
