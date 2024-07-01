import LoginLogo from '@/public/images/logo/login-logo.png';
import Image from 'next/image';
import Link from 'next/link';

import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="mx-auto flex max-w-520 flex-col">
      <div className="flex flex-col items-center gap-8 pb-40 pt-144 sm:pb-60 sm:pt-240 xl:pb-40 xl:pt-223">
        <Link href="/">
          <Image
            className="sm:h-279 sm:w-200"
            src={LoginLogo}
            alt="LoginLogo"
            priority={true}
            width={120}
            height={167}
          ></Image>
        </Link>
        <div className="text-20">오늘도 만나서 반가워요!</div>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
