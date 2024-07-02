import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import invisible from '@/public/images/icon/ic-invisible.svg';
import visible from '@/public/images/icon/ic-visible.svg';
import axios from '@/lib/axios';
import cookies from 'js-cookie';
import { useRouter } from 'next/router';


interface InputState {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [input, setInput] = useState<InputState>({
    email: '',
    password: '',
  });
  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!emailPattern.test(e.target.value) ? '이메일 형식으로 작성해 주세요.' : '');
    } else if(e.target.name === 'password') {
      setPasswordError(e.target.value.length > 7 ? '' : '8자 이상 입력해 주세요.');
    }
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const isFormValid = !emailError && !passwordError && Boolean(input.email) && Boolean(input.password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = input;
    
    try {
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
        , { expires: 7, secure: true, sameSite: 'Strict' });
      router.push('mydashboard')
      console.log('로그인 성공');
    } catch (error) {
      console.log(error)
      console.error('로그인 실패:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full px-12 flex flex-col gap-20'>
      <div className='flex flex-col gap-16'>
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
      </div>
      <div className='flex-center flex-col gap-24'>
        <button type="submit" className={isFormValid ? 'btn_login_large_active' : 'btn_login_large_disabled'} disabled={!isFormValid}>로그인</button>
        <div>회원이 아니신가요? <Link className='text-violet-20 underline' href='/signup'>회원가입하기</Link></div>
      </div>
    </form>
  );
};

export default LoginForm;