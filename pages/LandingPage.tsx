import mailIcon from '@/public/images/icon/ic-email.svg';
import facebookIcon from '@/public/images/icon/ic-facebook.svg';
import instagramIcon from '@/public/images/icon/ic-instagram.svg';
import landingCard1 from '@/public/images/logo/img-landing-card1.png';
import landingCard2 from '@/public/images/logo/img-landing-card2.png';
import landingCard3 from '@/public/images/logo/img-landing-card3.png';
import navLogo from '@/public/images/logo/nav-logo-wh-lg.svg';
import navSmallLogo from '@/public/images/logo/nav-logo-wh-sm.svg';
import mainLogo from '@/public/images/logo/main-logo.png';
import point1Logo from '@/public/images/logo/point1-logo.png';
import point2Logo from '@/public/images/logo/point2-logo.png';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
      <nav className="flex h-60 justify-between pr-18 sm:h-70">
        <div className="flex-center pl-12">
          <Link href="/">
            <Image
              className="cursor-pointer"
              src={navLogoChange}
              alt="navLogo"
            />
          </Link>
        </div>
        <div className="gap-8 flex-center">
          <Link
            href="/login"
            className="pr-12 text-14 hover:underline sm:pr-16 sm:text-16 xl:pr-36"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="pr-4 text-14 hover:underline sm:pr-8 sm:text-16 xl:pr-36"
          >
            회원가입
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-1280">
        {/* 새로운 일정 관리 taskify section */}
        <div className="mb-80 mt-42 flex flex-col px-40 md:mb-184 md:mt-94">
          <div className="flex-center">
            <Image
              className="h-168 w-287 sm:h-315 sm:w-537 xl:h-423 xl:w-722"
              src={mainLogo}
              alt="mainLogo"
              priority
            />
          </div>
          <div className="flex-col gap-18 flex-center pt-26 md:pt-48">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-24">
              <div className="text-36 font-bold flex items-center flex-col md:flex-row md:gap-24 ">
                <div className='whitespace-nowrap flex-center h-48 text-40 md:h-100 md:text-56 xl:text-76'>새로운 일정 관리</div>
                <div className="teskify h-51 w-150 text-42 flex-center sm:w-253 md:h-65 md:text-70 xl:w-327 xl:text-90">Taskify</div>
              </div>
            </div>
            <div className="text-12 md:text-16 xl:text-18">
              서비스의 메인 설명 들어갑니다.
            </div>
          </div>
          <div className="pt-70 flex-center">
            <Link
              href="/login"
              className="text-14 btn_landing_login md:h-50 md:w-280 sm:text-16 xl:text-18"
            >
              로그인하기
            </Link>
          </div>
        </div>

        {/* point card section */}
        <div className="flex-center flex-col gap-90 px-16 sm:px-40">
          {/* point1 */}
          <div className="flex h-686 w-full flex-col justify-between rounded-lg bg-black-30 sm:h-972 md:max-w-700 xl:max-w-1200 xl:flex-row xl:h-600">
            <div className="flex-col flex-center sm:items-start sm:pl-60 xl:justify-start">
              <div className="pt-60 text-18 font-medium text-gray-40 sm:pt-63 sm:text-22 xl:pt-123">
                Point 1
              </div>
              <div className="pt-61 text-center text-36 font-bold sm:pt-100 sm:text-start sm:text-46 xl:pt-69">
                일의 우선순위를 <br />
                관리하세요
              </div>
            </div>
            <div className="flex justify-end xl:items-end">
              <Image
                className="h-248 w-284 sm:h-435 sm:w-520 xl:w-594 xl:h-498"
                src={point1Logo}
                alt="point1Logo"
              />
            </div>
          </div>
          {/* point2 */}
          <div className="flex h-686 w-full flex-col justify-between rounded-lg bg-black-30 sm:h-972 md:max-w-700 xl:max-w-1200 xl:flex-row-reverse xl:h-600 xl:justify-normal">
            <div className="flex-col flex-center sm:items-start sm:pl-60 xl:justify-start xl:w-1/2">
              <div className="pt-60 text-18 font-medium text-gray-40 sm:pt-63 sm:text-22 xl:pt-123">
                Point 2
              </div>
              <div className="pt-61 text-center text-36 font-bold sm:pt-100 sm:text-start sm:text-46 xl:pt-69">
                해야 할 일을 <br />
                등록하세요
              </div>
            </div>
            <div className="flex justify-center xl:items-end xl:w-1/2">
              <Image
                className="h-250 w-217 sm:h-415 sm:w-361 xl:w-436 xl:h-502 xl:ml-70"
                src={point2Logo}
                alt="point1Logo"
                priority
              />
            </div>
          </div>
          {/* card1,2,3 area */}
          <div className="flex max-w-1280 flex-col items-center gap-36 pb-120 sm:pb-160 xl:items-start">
            <div className="whitespace-nowrap text-18 font-bold sm:text-28">
              생산성을 높이는 다양한 설정⚡
            </div>
            <div className="flex w-full flex-col items-center gap-33 sm:gap-48 xl:flex-row xl:gap-33">
              <div>
                <div className="h-236 w-326 rounded-t-lg bg-black-20 sm:h-260 sm:w-378">
                  <div className="h-full pb-4 flex-center">
                    <Image
                      className="h-107 w-260 sm:h-124 sm:w-300"
                      src={landingCard1}
                      alt="landingCard1"
                    />
                  </div>
                </div>
                <div className="flex h-112 w-326 flex-col rounded-b-lg bg-black-30 pl-32 sm:h-124 sm:w-378">
                  <div className="pt-28 text-16 font-bold sm:pt-28">
                    대시보드 설정
                  </div>
                  <div className="pt-12 text-14 font-medium sm:pt-18">
                    대시보드 사진과 이름을 변경할 수 있어요.
                  </div>
                </div>
              </div>
              <div>
                <div className="h-236 w-326 rounded-t-lg bg-black-20 sm:h-260 sm:w-378">
                  <div className="h-full pb-4 flex-center">
                    <Image
                      className="h-200 w-260 sm:h-231 sm:w-300"
                      src={landingCard2}
                      alt="landingCard2"
                    />
                  </div>
                </div>
                <div className="flex h-112 w-326 flex-col rounded-b-lg bg-black-30 pl-32 sm:h-124 sm:w-378">
                  <div className="pt-28 text-16 font-bold sm:pt-28">초대</div>
                  <div className="pt-12 text-14 font-medium sm:pt-18">
                    새로운 팀원을 초대할 수 있어요.
                  </div>
                </div>
              </div>
              <div>
                <div className="h-236 w-326 rounded-t-lg bg-black-20 sm:h-260 sm:w-378">
                  <div className="h-full pb-4 flex-center">
                    <Image
                      className="h-169 w-260 sm:h-196 sm:w-300"
                      src={landingCard3}
                      alt="landingCard3"
                    />
                  </div>
                </div>
                <div className="flex h-112 w-326 flex-col rounded-b-lg bg-black-30 pl-32 sm:h-124 sm:w-378">
                  <div className="pt-28 text-16 font-bold sm:pt-28">구성원</div>
                  <div className="pt-12 text-14 font-medium sm:pt-18">
                    구성원을 초대하고 내보낼 수 있어요.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer section */}
      <footer className="flex h-216 flex-col items-center text-gray-40 sm:h-100 sm:flex-row sm:justify-between sm:px-40 xl:px-141">
        <div>©codeit - 2023</div>
        <div className="flex gap-28 pt-8 sm:pt-0">
          <div>Privacy Policy</div>
          <div>FAQ</div>
        </div>
        <div className="flex gap-24 pt-52 sm:gap-16 sm:pt-0">
          <Image src={mailIcon} alt="mailIcon" />
          <Image src={facebookIcon} alt="facebookIcon" />
          <Image src={instagramIcon} alt="instagramIcon" />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
