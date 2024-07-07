import instance from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useState } from 'react';

import SimpleModal from '../common/SimpleModal';

interface InputState {
  currentPw: string;
  newPw: string;
  checkNewPw: string;
}
interface ValidateFieldParams {
  name: 'currentPw' | 'newPw' | 'checkNewPw';
  value: string;
}

const ChangePassword = () => {
  const [currentPwError, setCurrentPwError] = useState('');
  const [newPwError, setNewPwError] = useState('');
  const [checkNewPwError, setCheckNewPwError] = useState('');
  const [input, setInput] = useState<InputState>({
    currentPw: '',
    newPw: '',
    checkNewPw: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const validateField = ({ name, value }: ValidateFieldParams) => {
    if (name === 'currentPw') {
      setCurrentPwError(value.length > 7 ? '' : '8자 이상 입력해 주세요.');
    } else if (name === 'newPw') {
      if (value === input.currentPw) {
        setNewPwError('현재 비밀번호와 일치합니다.');
      } else {
        setNewPwError(value.length > 7 ? '' : '8자 이상 입력해 주세요.');
      }
      if (input.checkNewPw) {
        setCheckNewPwError(
          value === input.checkNewPw ? '' : '비밀번호가 일치하지 않습니다.',
        );
      }
    } else if (name === 'checkNewPw') {
      setCheckNewPwError(
        value === input.newPw ? '' : '비밀번호가 일치하지 않습니다.',
      );
    }
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField({
      name: name as 'currentPw' | 'newPw' | 'checkNewPw',
      value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { currentPw, newPw } = input;

    try {
      await instance.put('auth/password', {
        password: currentPw,
        newPassword: newPw,
      });
      
      setModalMessage('비밀번호가 성공적으로 변경되었습니다.');
      openModal();
    } catch (error) {
      if (isAxiosError(error)) {
        openModal();
        setModalMessage(error.response?.data.message);
        console.log(error);
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    if (modalMessage === '비밀번호가 성공적으로 변경되었습니다.') {
      window.location.reload();
    }
  };

  const isFormValid =
    !currentPwError &&
    !newPwError &&
    !checkNewPwError &&
    Boolean(input.currentPw) &&
    Boolean(input.newPw) &&
    Boolean(input.checkNewPw);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-480 flex-col px-20 pb-20 pt-28 md:max-w-620 md:px-28 md:pb-28"
    >
      <div>
        <h1 className="text-20 font-bold md:text-24">비밀번호 변경</h1>
      </div>
      <div className="flex flex-col gap-16 pt-24 md:gap-20">
        <div className="flex flex-col gap-10">
          <h2 className="text-16 md:text-18">현재 비밀번호</h2>
          <input
            onBlur={onBlur}
            onChange={onChange}
            name="currentPw"
            value={input.currentPw}
            className={`pl-16 text-14 placeholder:text-14 md:h-48 md:text-16 md:placeholder:text-16 ${currentPwError ? 'MyPageErrorInput' : 'MyPageInput'}`}
            placeholder="현재 비밀번호 입력"
            type="password"
            autoComplete="password"
          />
          {currentPwError && (
            <div className="text-14 text-red">{currentPwError}</div>
          )}
        </div>
        <div className="flex flex-col gap-10">
          <h2 className="text-16 md:text-18">새 비밀번호</h2>
          <input
            onBlur={onBlur}
            onChange={onChange}
            value={input.newPw}
            name="newPw"
            className={`pl-16 text-14 placeholder:text-14 md:h-48 md:text-16 md:placeholder:text-16 ${newPwError ? 'MyPageErrorInput' : 'MyPageInput'}`}
            placeholder="새 비밀번호 입력"
            type="password"
            autoComplete="password"
          />
          {newPwError && <div className="text-14 text-red">{newPwError}</div>}
        </div>
        <div className="flex flex-col gap-10">
          <h2 className="text-16 md:text-18">새 비밀번호 확인</h2>
          <input
            onBlur={onBlur}
            onChange={onChange}
            value={input.checkNewPw}
            name="checkNewPw"
            className={`pl-16 text-14 placeholder:text-14 md:h-48 md:text-16 md:placeholder:text-16 ${checkNewPwError ? 'MyPageErrorInput' : 'MyPageInput'}`}
            placeholder="새 비밀번호 입력"
            type="password"
            autoComplete="password"
          />
          {checkNewPwError && (
            <div className="text-14 text-red">{checkNewPwError}</div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`text-12 md:text-14 ${isFormValid ? 'btn_myPage_active' : 'btn_myPage_disabled'}`}
            disabled={!isFormValid}
          >
            변경
          </button>
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

export default ChangePassword;
