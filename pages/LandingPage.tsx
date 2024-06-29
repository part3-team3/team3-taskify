import mailIcon from '@/public/images/icon/ic-email.svg';
import facebookIcon from '@/public/images/icon/ic-facebook.svg';
import instagramIcon from '@/public/images/icon/ic-instagram.svg';
import landingCard1 from '@/public/images/logo/img-landing-card1.png';
import landingCard2 from '@/public/images/logo/img-landing-card2.png';
import landingCard3 from '@/public/images/logo/img-landing-card3.png';
import taskifyImg from '@/public/images/logo/img-taskify.png';
import navLogo from '@/public/images/logo/landing-nav-logo-lg.png';
import navSmallLogo from '@/public/images/logo/landing-nav-logo-sm.png';
import mainLogo from '@/public/images/logo/main-logo.png';
import point1Logo from '@/public/images/logo/point1-logo.png';
import point2Logo from '@/public/images/logo/point2-logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const LandingPage = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // 초기화시 현재 창 크기로 설정
    handleResize();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navLogoChange = windowWidth > 375 ? navLogo : navSmallLogo;
  
  return (
    <div className="bg-black text-white">
      {/* nav바 */}
      <nav className="flex justify-between h-60 px-24">
        <div className="flex-center">
          <Link href="/">
            <Image className="cursor-pointer" src={navLogoChange} alt="navLogo" />
          </Link>
        </div>
        <div className="flex-center gap-8">
          <Link href="/login" className="text-14 pr-12 hover:underline">
            로그인
          </Link>
          <Link href="/signup" className="text-14 pr-4 hover:underline">
            회원가입
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-1280">
        {/* 새로운 일정 관리 taskify section */}
        <div className="mb-80 mt-42 flex flex-col gap-26 px-40">
          <div className="flex-center">
            <Image
              className="h-168 w-287 md:h-315 md:w-537 lg:h-423 lg:w-722 xl:h-423 xl:w-722"
              src={mainLogo}
              alt="mainLogo"
              priority
            />
          </div>
          <div className="flex-col gap-18 flex-center">
            <div className="flex gap-5 flex-col items-center">
              <div className="w-245 h-48 text-32 font-bold whitespace-nowrap">새로운 일정 관리</div>
              <Image
                className="h-44 w-150"
                src={taskifyImg}
                alt="taskify-Img"
                priority
              />
            </div>
            <div className='text-12'>서비스의 메인 설명 들어갑니다.</div>
          </div>
          <div className="flex-center pt-44">
            <Link href="/login" className="btn_landing_login text-14">
              로그인하기
            </Link>
          </div>
        </div>

        {/* point card section */}
        <div className="flex flex-col gap-90 px-16">
          {/* point1 */}
          <div className="h-686 w-full rounded-lg bg-black-30 flex flex-col justify-between">
            <div className="flex-center flex-col">
              <div className="pt-60 text-18 font-medium text-gray-40">
                Point 1
              </div>
              <div className="pt-61 text-36 font-bold text-center">
                일의 우선순위를 <br />
                관리하세요
              </div>
            </div>
            <div className="flex justify-end">
              <Image className="w-284 h-248" src={point1Logo} alt="point1Logo" />
            </div>
          </div>
          {/* point2 */}
          <div className="h-686 w-full rounded-lg bg-black-30 flex flex-col justify-between">
            <div className="flex-center flex-col">
              <div className="pt-60 text-18 font-medium text-gray-40">
                Point 2
              </div>
              <div className="pt-61 text-36 font-bold text-center">
                해야 할 일을 <br />
                등록하세요
              </div>
            </div>
            <div className="flex justify-center">
              <Image className="w-217 h-250" src={point2Logo} alt="point1Logo" />
            </div>
          </div>
          {/* card1,2,3 area */}
          <div className="flex items-center max-w-1280 flex-col gap-36 pb-120">
            <div className="text-18 font-bold whitespace-nowrap">
              생산성을 높이는 다양한 설정 ⚡
            </div>
            <div className="flex items-center w-full flex-col gap-33">
              <div>
                <div className="h-236 w-343 rounded-t-lg bg-black-20">
                  <div className="h-full pb-4 flex-center">
                    <Image className='w-260 h-107' src={landingCard1} alt="landingCard1" />
                  </div>
                </div>
                <div className="flex h-112 w-343 flex-col rounded-b-lg bg-black-30 pl-32">
                  <div className="pt-28 text-16 font-bold">대시보드 설정</div>
                  <div className="pt-12 text-14 font-medium">
                    대시보드 사진과 이름을 변경할 수 있어요.
                  </div>
                </div>
              </div>
              <div>
                <div className="h-236 w-343 rounded-t-lg bg-black-20">
                  <div className="h-full pb-4 flex-center">
                    <Image className='w-260 h-200' src={landingCard2} alt="landingCard2" />
                  </div>
                </div>
                <div className="flex h-112 w-343 flex-col rounded-b-lg bg-black-30 pl-32">
                  <div className="pt-28 text-16 font-bold">초대</div>
                  <div className="pt-12 text-14 font-medium">
                    새로운 팀원을 초대할 수 있어요.
                  </div>
                </div>
              </div>
              <div>
                <div className="h-236 w-343 rounded-t-lg bg-black-20">
                  <div className="h-full pb-4 flex-center">
                    <Image className='w-260 h-169' src={landingCard3} alt="landingCard3" />
                  </div>
                </div>
                <div className="flex h-112 w-343 flex-col rounded-b-lg bg-black-30 pl-32">
                  <div className="pt-28 text-16 font-bold">구성원</div>
                  <div className="pt-12 text-14 font-medium">
                    구성원을 초대하고 내보낼 수 있어요.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer section */}
      <footer className="flex flex-col h-216 text-gray-40 items-center">
        <div>©codeit - 2023</div>
        <div className="flex gap-28 pt-8">
          <div>Privacy Policy</div>
          <div>FAQ</div>
        </div>
        <div className="flex gap-24 pt-52">
          <Image src={mailIcon} alt="mailIcon" />
          <Image src={facebookIcon} alt="facebookIcon" />
          <Image src={instagramIcon} alt="instagramIcon" />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
