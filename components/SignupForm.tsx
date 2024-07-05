import axios from '@/lib/axios';
import invisible from '@/public/images/icon/ic-invisible.svg';
import visible from '@/public/images/icon/ic-visible.svg';
import { isAxiosError } from 'axios';
import cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import SimpleModal from './common/SimpleModal';

interface InputState {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
}

interface PasswordVisibilityState {
  password: boolean;
  confirmPassword: boolean;
}

interface ValidateFieldParams {
  name: 'email' | 'nickname' | 'password' | 'checkPassword';
  value: string;
}

const SignupForm = () => {
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checkPasswordError, setCheckPasswordError] = useState('');
  const [input, setInput] = useState<InputState>({
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // 성공 여부 추가
  const router = useRouter();

  const togglePasswordVisibility = (field: keyof PasswordVisibilityState) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const CheckToggle = () => {
    setChecked(!checked);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const validateField = ({ name, value }: ValidateFieldParams) => {
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(
        !emailPattern.test(value) ? '이메일 형식으로 작성해 주세요.' : '',
      );
    } else if (name === 'nickname') {
      setNameError(value ? '' : '닉네임을 입력해 주세요.');
    } else if (name === 'password') {
      setPasswordError(value.length > 7 ? '' : '8자 이상 입력해 주세요.');
      if (input.checkPassword) {
        setCheckPasswordError(
          value === input.checkPassword ? '' : '비밀번호가 일치하지 않습니다.',
        );
      }
    } else if (name === 'checkPassword') {
      setCheckPasswordError(
        value === input.password ? '' : '비밀번호가 일치하지 않습니다.',
      );
    }
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField({
      name: name as 'email' | 'nickname' | 'password' | 'checkPassword',
      value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, nickname, password } = input;

    try {
      await axios.post('users', { email, nickname, password });
      const res = await axios.post('auth/login', { email, password });
      const { accessToken } = res.data;
      // 쿠키에 토큰 저장
      // 'accessToken' 쿠키 이름
      // accessToken 쿠키에 저장할 실제 값 서버로부터 받은 액세서 토큰
      // expires 만료 날짜 7= 일주일
      // secure 보안 강화 코드 https 연결에서만 전송
      // sameSite 사이트 간 요청에 어떻게 처리할지 결정
      // Strict 동일한 사이트에서만 전송되도록 처리 CSRF공격 방지 유용
      cookies.set('accessToken', accessToken, {
        expires: 1,
        secure: true,
        sameSite: 'Strict',
      });
      setModalMessage('가입이 완료되었습니다!');
      setIsSuccess(true); // 성공 상태 설정
      openModal();
      console.log('로그인 성공');
    } catch (error) {
      if (isAxiosError(error)) {
        openModal();
        setModalMessage(error.response?.data.message);
        setIsSuccess(false); // 실패 상태 설정
        console.log(error);
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      router.replace('mydashboard'); // 성공 시 페이지 이동
    }
  };

  const isFormValid =
    checked &&
    !emailError &&
    !nameError &&
    !passwordError &&
    !checkPasswordError &&
    input.email &&
    input.nickname &&
    input.password &&
    input.checkPassword;

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-20 px-12">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <div>이메일</div>
          <input
            name="email"
            value={input.email}
            onBlur={onBlur}
            onChange={onChange}
            className={`px-16 py-15 ${emailError ? 'errorInput' : 'input'}`}
            placeholder="이메일을 입력해 주세요"
            type="email"
            autoComplete="email"
          />
          {emailError && <div className="text-14 text-red">{emailError}</div>}
        </div>
        <div className="flex flex-col gap-8">
          <div>닉네임</div>
          <input
            name="nickname"
            value={input.nickname}
            onBlur={onBlur}
            onChange={onChange}
            className={`px-16 py-15 ${nameError ? 'errorInput' : 'input'}`}
            placeholder="닉네임을 입력해 주세요"
            type="text"
            autoComplete="username"
          />
          {nameError && <div className="text-14 text-red">{nameError}</div>}
        </div>

        <div className="relative flex flex-col gap-8">
          <div>비밀번호</div>
          <input
            id="pw"
            name="password"
            value={input.password}
            onBlur={onBlur}
            onChange={onChange}
            className={`px-16 py-15 ${passwordError ? 'errorInput' : 'input'}`}
            placeholder="8자 이상 입력해 주세요"
            type={passwordVisibility.password ? 'text' : 'password'}
            autoComplete="password"
          />
          {passwordError && (
            <div className="text-14 text-red">{passwordError}</div>
          )}
          <div
            className="absolute right-15 top-45 cursor-pointer"
            onClick={() => togglePasswordVisibility('password')}
          >
            <Image
              src={passwordVisibility.password ? visible : invisible}
              alt={passwordVisibility.password ? 'visible' : 'invisible'}
            />
          </div>
        </div>
        <div className="relative flex flex-col gap-8">
          <div>비밀번호 확인</div>
          <input
            id="pw-confirm"
            name="checkPassword"
            value={input.checkPassword}
            onBlur={onBlur}
            onChange={onChange}
            className={`px-16 py-15 ${checkPasswordError ? 'errorInput' : 'input'}`}
            placeholder="비밀번호를 한번 더 입력해 주세요"
            type={passwordVisibility.confirmPassword ? 'text' : 'password'}
            autoComplete="password"
          />
          {checkPasswordError && (
            <div className="text-14 text-red">{checkPasswordError}</div>
          )}
          <div
            className="absolute right-15 top-45 cursor-pointer"
            onClick={() => togglePasswordVisibility('confirmPassword')}
          >
            <Image
              src={passwordVisibility.confirmPassword ? visible : invisible}
              alt={passwordVisibility.confirmPassword ? 'visible' : 'invisible'}
            />
          </div>
        </div>
      </div>

      <div className="relative">
        <div onChange={CheckToggle} className="flex items-center gap-8">
          <input
            id="chk"
            className="bg-check-icon bg-center bg-no-repeat checkbox-custom"
            type="checkbox"
          />
          <label htmlFor="chk" className="cursor-pointer select-none">
            이용약관에 동의합니다.
          </label>
        </div>
      </div>
      <div className="flex-col gap-24 flex-center">
        <button
          type="submit"
          className={
            isFormValid ? 'btn_login_large_active' : 'btn_login_large_disabled'
          }
          disabled={!isFormValid}
        >
          가입하기
        </button>
        <div>
          이미 가입하셨나요?{' '}
          <Link className="text-violet-20 underline" href="/login">
            로그인하기
          </Link>
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

export default SignupForm;
