
import ChangePassword from '@/components/Mypage/ChangePassword';
import ProfileChange from '@/components/Mypage/ProfileChange';
import SideBar from '@/components/sidebar/SideBar';
import instance from '@/lib/axios';
import arrow from '@/public/images/icon/ic-on-arrow-left.svg'
import Image from 'next/image';
import { useEffect, useState } from 'react';

const MyPage = () => {
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await instance.get('/users/me');  // 실제 API 엔드포인트에 맞게 수정
        setNickname(res.data.nickname);
        setProfileImage(res.data.profileImageUrl)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='relative text-black-20'>
      <div className='h-60 w-full pl-67 md:pl-160 xl:pl-300 flex items-center justify-between border-b border-gray-30 md:pr-40 md:h-70 xl:pr-80'>
        <div className='text-20 pl-40 font-bold'>계정관리</div>
        <div className='flex items-center gap-12 pr-13'>
          <div className='rounded-50 w-34 h-34'>
            <Image width={34} height={34} className='rounded-50 w-34 h-34' src={profileImage} alt='profilelogo' />
          </div>
          <div>{nickname}</div>
        </div>
      </div>
      <div className='absolute top-0 left-0'>
        <SideBar />
      </div>
      <div className='pl-65 md:pl-160 xl:pl-300'>
        <div className='px-12 md:px-20'>
          <div className='flex gap-4 pt-15 cursor-pointer'>
            <Image className='w-20 h-20 md:w-24 md:h-24' src={arrow} alt='returnarrow' />
            <div className='text-14 text-cente md:text-16 hover:underline'>돌아가기</div>
          </div>
          <div className='flex flex-col gap-12'>
            <ProfileChange />
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage;