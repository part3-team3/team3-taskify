import SignupForm from '@/components/SignupForm'
import LoginLogo from '@/public/images/logo/login-logo.svg';
import Image from 'next/image';
import Link from 'next/link';


const SignupPage = () => {
  return(
    <div className="mx-auto flex max-w-520 flex-col">
      <div className="flex flex-col items-center gap-8 pb-50 pt-108 sm:pb-38 sm:pt-123">
      <Link href='/'>
          <Image
            className="h-167 w-120 sm:h-279 sm:w-200"
            src={LoginLogo}
            alt="LoginLogo"
            priority={true}
            width={200}
            height={279}
          />
        </Link>
        <div className="text-20">첫 방문을 환영합니다!</div>
      </div>
      <SignupForm />
    </div>
  )
}

export default SignupPage;