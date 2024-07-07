import instance from '@/lib/axios';
import PlusBtn from '@/public/images/icon/ic-plus-purple.svg';
import { isAxiosError } from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import SimpleModal from '../common/SimpleModal';

const ProfileChange = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalNickname, setOriginalNickname] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await instance.get('/users/me');
        setEmail(res.data.email);
        setNickname(res.data.nickname);
        setOriginalNickname(res.data.nickname);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      let profileImageUrl = '';

      if (imageFile) {
        formData.append('image', imageFile);
        const res = await instance.post('/users/me/image', formData);
        profileImageUrl = res.data.profileImageUrl;
      }

      const payload = {
        nickname,
        ...(profileImageUrl && { profileImageUrl }),
      };

      await instance.put('/users/me', payload);

      if (imageFile && nickname !== originalNickname) {
        setModalMessage('닉네임과 프로필사진이 저장되었습니다.');
      } else if (imageFile) {
        setModalMessage('프로필 사진이 저장되었습니다.');
      } else if (nickname !== originalNickname) {
        setModalMessage('닉네임이 저장되었습니다.');
      } else {
        setModalMessage('변경사항이 없습니다.');
      }

      openModal();
    } catch (error) {
      if (isAxiosError(error)) {
        setModalMessage(error.response?.data.message);
        openModal();
        console.log(error);
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    if (
      modalMessage === '닉네임과 프로필사진이 성공적으로 저장되었습니다.' ||
      modalMessage === '프로필 사진이 저장되었습니다.' ||
      modalMessage === '닉네임이 저장되었습니다.'
    ) {
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-480 flex-col px-20 pb-20 md:max-w-620 md:px-28 md:pb-28"
    >
      <div className="pt-48 md:pt-57">
        <h1 className="text-20 font-bold md:text-24">프로필</h1>
      </div>
      <div className="pt-24 md:flex md:pt-32">
        <label
          htmlFor="file"
          className="h-100 w-100 shrink-0 rounded-6 bg-gray-10 flex-center md:h-182 md:w-182"
        >
          {selectedImage ? (
            <Image
              width={100}
              height={100}
              className="h-100 w-100 rounded-6 object-cover md:h-182 md:w-182"
              src={selectedImage}
              alt="Profile"
            />
          ) : (
            <Image
              width={20}
              height={20}
              className="h-20 w-20 md:h-30 md:w-30"
              src={PlusBtn}
              alt="plusbtn"
            />
          )}
        </label>
        <input
          className="hidden"
          id="file"
          type="file"
          onChange={handleImageChange}
        />
        <div className="flex w-full flex-col gap-16 pt-24 md:gap-20 md:pl-16 md:pt-0">
          <div className="flex flex-col gap-10">
            <h2 className="text-16 leading-6 md:text-18">이메일</h2>
            <input
              className="MyPageInput pl-16 text-14 placeholder:text-14 md:h-48 md:text-16 md:placeholder:text-16"
              type="text"
              placeholder={email}
              disabled={true}
            />
          </div>
          <div className="flex flex-col gap-10">
            <h2 className="text-16 leading-6 md:text-18">닉네임</h2>
            <input
              className="MyPageInput pl-16 text-14 placeholder:text-14 md:h-48 md:text-16 md:placeholder:text-16"
              type="text"
              onChange={handleChange}
              value={nickname}
              placeholder="닉네임을 입력해 주세요."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn_myPage_active whitespace-nowrap text-12 flex-center md:text-14"
            >
              저장
            </button>
          </div>
        </div>
      </div>
      {modalMessage && (
        <SimpleModal // Modal 컴포넌트에 넘겨주고 싶은 값을 prop으로 설정하기
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          <div className="pb-44 sm:pb-24">{modalMessage}</div>

          <button
            onClick={closeModal}
            className="absolute bottom-28 btn_modal_small_purple sm:right-28 sm:btn_modal_large_purple"
          >
            확인
          </button>
        </SimpleModal>
      )}
    </form>
  );
};

export default ProfileChange;