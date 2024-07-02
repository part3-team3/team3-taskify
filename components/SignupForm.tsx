import invisible from '@/public/images/icon/ic-invisible.svg';
import visible from '@/public/images/icon/ic-visible.svg';
import axios from '@/lib/axios';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import cookies from 'js-cookie';

interface InputState {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
}

const SignupForm = () => {
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [checkPasswordError, setCheckPasswordError] = useState('');
  const router = useRouter();
  const [input, setInput] = useState<InputState>({
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
  })

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const CheckToggle = () => {
    setChecked(!checked);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })

    if (e.target.name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!emailPattern.test(e.target.value) ? '이메일 형식으로 작성해 주세요.' : '');
    } else if(e.target.name === 'name') {
      setNameError(e.target.value ? '' : '닉네임을 입력해 주세요.') 
    } else if(e.target.name === 'password') {
      setPasswordError(e.target.value.length > 7 ? '' : '8자 이상 입력해 주세요.')
    } else if(e.target.name === 'checkPassword') {
      setCheckPasswordError(e.target.value === input.password ? '' : '비밀번호가 일치하지 않습니다.')
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {email, nickname, password} = input;

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
      cookies.set('accessToken', accessToken
        , { expires: 1, secure: true, sameSite: 'Strict' });
      router.replace('mydashboard')
      console.log('로그인 성공');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  }
  
  const isFormValid = checked && !emailError && !nameError && !passwordError && !checkPasswordError && input.email && input.nickname && input.password && input.checkPassword;
  
  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-20 px-12">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <div>이메일</div>
          <input
            name='email'
            value={input.email}
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
            name='nickname'
            value={input.nickname}
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
              name='password'
              value={input.password}
              onChange={onChange}
              className={`px-16 py-15 ${passwordError ? 'errorInput' : 'input'}`}
              placeholder="8자 이상 입력해 주세요"
              type={passwordVisibility.password ? 'text' : 'password'}
              autoComplete="password"
            />
            {passwordError && <div className="text-14 text-red">{passwordError}</div>}
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
              name='checkPassword'
              value={input.checkPassword}
              onChange={onChange}
              className={`px-16 py-15 ${checkPasswordError ? 'errorInput' : 'input'}`}
              placeholder="비밀번호를 한번 더 입력해 주세요"
              type={passwordVisibility.confirmPassword ? 'text' : 'password'}
              autoComplete="password"
            />
            {checkPasswordError && <div className="text-14 text-red">{checkPasswordError}</div>}
            <div
              className="absolute right-15 top-45 cursor-pointer"
              onClick={() => togglePasswordVisibility('confirmPassword')}
            >
              <Image
                src={passwordVisibility.confirmPassword ? visible : invisible}
                alt={
                  passwordVisibility.confirmPassword ? 'visible' : 'invisible'
                }
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
        <button type='submit' className={isFormValid  ? 'btn_login_large_active' : 'btn_login_large_disabled'} disabled={!isFormValid}>가입하기</button>
        <div>
          이미 가입하셨나요?{' '}
          <Link className="text-violet-20 underline" href="/login">
            로그인하기
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
