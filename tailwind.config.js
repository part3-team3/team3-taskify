const px0_50 = { ...Array.from(Array(51)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
// const px0_400 = { ...Array.from(Array(401)).map((_, i) => `${i}px`) };
const px0_1920 = { ...Array.from(Array(1921)).map((_, i) => `${i}px`) };

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: px0_50,
      fontSize: px0_100,
      spacing: px0_200,
      width: px0_1920,
      height: px0_1920,
      // 공지
      padding: px0_1920,

      maxWidth: {
        ...px0_1920,
        1200: '1200px', // maxWidth를 1200px로 설정
      },
      // 공지
      backgroundImage: {
        'check-icon': "url('/images/icon/ic-check.svg')",
      },
      colors: {
        red: '#D6173A',
        green: '#7AC555',
        green10: '#E7F7DB',
        green20: '#86D549',

        purple: '#760DDE',
        orange: '#FFA500',

        pink: '#E876EA',
        pink10: '#F7DBF0',
        pink20: '#D549B6',

        blue: '#76A5EA',
        blue10: '#DBE6F7',
        blue20: '#4981D5',

        yellow: {
          10: '#F9EEE3',
          20: '#D58D49',
        },

        gray: {
          10: '#F5F5F5',
          20: '#EEEEEE',
          30: '#D9D9D9',
          40: '#9FA6B2',
          50: '#787486',
        },

        black: {
          DEFAULT: '#000000',
          10: '#4B4B4B',
          20: '#333236',
          30: '#171717',
        },

        violet: {
          10: '#F1EFFD',
          20: '#5534DA',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        // 회색 테두리 스타일링
        '.border-1px-solid-gray-30': {
          border: '1px solid #D9D9D9',
        },
        // flex로 가운데 정렬시 3개 한번에 적용해줌
        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        // 랜딩페이지 로그인 버튼
        '.btn_landing_login': {
          width: '235px',
          height: '42px',
          borderRadius: '8px',
          backgroundColor: '#5534DA',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        // 공지
        '.checkbox-custom': {
          appearance: 'none',
          backgroundColor: 'white',
          border: '1px solid #D9D9D9',
          borderRadius: '4px',
          width: '20px',
          height: '20px',
          cursor: 'pointer',
          flexShrink: 0,
          marginTop: '1px',
          outline: 'none',
        },
        '.checkbox-custom:focus': {
          border: '1px solid #5534DA',
        },
        '.checkbox-custom:checked': {
          backgroundColor: '#5534DA',
          border: 'none',
        },
        '.input': {
          border: '1px solid #D9D9D9',
          borderRadius: '8px',
          width: '100%',
          height: '50px',
          outline: 'none',
        },
        '.errorInput': {
          border: '1px solid #D6173A',
          borderRadius: '8px',
          width: '100%',
          height: '50px',
          outline: 'none',
        },
        '.input:focus': {
          border: '1px solid #5534DA',
        },
        '.MyPageInput': {
          border: '1px solid #D9D9D9',
          borderRadius: '6px',
          width: '100%',
          height: '42px',
          outline: 'none',
        },
        '.MyPageErrorInput': {
          border: '1px solid #D6173A',
          borderRadius: '6px',
          width: '100%',
          height: '50px',
          outline: 'none',
        },
        '.MyPageInput:focus': {
          border: '1px solid #5534DA',
        },
        // 공지
        // 회색 테두리 스타일링
        '.border-1px-solid-gray-30': {
          border: '1px solid #D9D9D9',
        },
        '.btn_myPage_disabled': {
          width: '84px',
          padding: '7px 29px',
          fontWeight: '500',
          lineHeight: '17px',
          color: '#ffffff',
          backgroundColor: '#9FA6B2',
          borderRadius: '4px',
          outline: 'none',
          cursor: 'default',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          whiteSpace: 'nowrap',
        },
        '.btn_myPage_active': {
          width: '84px',
          padding: '7px 29px',
          fontWeight: '500',
          lineHeight: '17px',
          color: '#ffffff',
          backgroundColor: '#5534DA',
          borderRadius: '4px',
          outline: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          whiteSpace: 'nowrap',
        },
        // 로그인, 회원가입 페이지 데스크탑, 테블릿 회색(비활성화) 버튼
        '.btn_login_large_disabled': {
          width: '100%',
          height: '50px',
          fontSize: '18px',
          fontWeight: '500',
          lineHeight: '22px',
          color: '#ffffff',
          backgroundColor: '#9FA6B2',
          borderRadius: '8px',
          cursor: 'default',
          outline: 'none',
        },
        // 로그인, 회원가입 페이지 데스크탑, 테블릿 보라색(활성화) 버튼
        '.btn_login_large_active': {
          width: '100%',
          height: '50px',
          fontSize: '18px',
          fontWeight: '500',
          lineHeight: '22px',
          color: '#ffffff',
          backgroundColor: '#5534DA',
          borderRadius: '8px',
          cursor: 'pointer',
          outline: 'none',
        },
        '.box_shadow': {
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;',
        },
        // 공지
        '.btn_login_large_active:hover': {
          // backgroundColor: 'black',
        },
        // 로그인, 회원가입 페이지 모바일 회색(비활성화) 버튼
        '.btn_login_small_disabled': {
          width: '351px',
          height: '50px',
          padding: '14px 146px',
          fontSize: '18px',
          fontWeight: '500',
          lineHeight: '22px',
          color: '#ffffff',
          backgroundColor: '#9FA6B2',
          borderRadius: '8px',
        },
        // 로그인, 회원가입 페이지 모바일 보라색(활성화) 버튼
        '.btn_login_small_active': {
          width: '351px',
          height: '50px',
          padding: '14px 146px',
          fontSize: '18px',
          fontWeight: '500',
          lineHeight: '22px',
          color: '#ffffff',
          backgroundColor: '#5534DA',
          borderRadius: '8px',
        },
        // 보라색 버튼
        // 로그인 페이지 비밀번호 불일치 모달(d, t), 회원가입 페이지 가입 완료, 이미 사용중 이메일 모달(d, t), 마이페이지 비밀번호 틀렸습니다 모달(d, t)
        // 대시보드 생성 모달(d, t), 할일 수정 모달(d, t), 할일 생성 모달(d, t),
        // 컬럼 추가 모달(d, t), 컬럼 수정 모달(d, t), 초대하기 모달(d, t)
        '.btn_modal_large_purple': {
          width: '120px',
          height: '48px',
          padding: '14px 46px',
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '19px',
          color: '#ffffff',
          backgroundColor: '#5534DA',
          borderRadius: '8px',
        },
        // 흰색 버튼
        // 대시보드 생성 모달(d, t), 할일 수정 모달(d, t), 할일 생성 모달(d, t),
        // 컬럼 추가 모달(d, t), 컬럼 수정 모달(d, t), 초대하기 모달(d, t)
        '.btn_modal_large_white': {
          width: '122px',
          height: '48px',
          padding: '14px 46px',
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '19px',
          color: '#787486',
          backgroundColor: '#ffffff',
          border: '1px solid #D9D9D9',
          borderRadius: '8px',
        },
        // 보라색 버튼
        // 로그인 페이지 비밀번호 불일치 모달(m), 회원가입 페이지 가입 완료, 이미 사용중 이메일 모달(m), 마이페이지 비밀번호 틀렸습니다 모달(m)
        // 대시보드 생성 모달(m), 할일 수정 모달(m), 할일 생성 모달(m),
        // 컬럼 추가 모달(m), 컬럼 수정 모달(m), 초대하기 모달(m)
        '.btn_modal_small_purple': {
          width: '138px',
          height: '42px',
          padding: '12px 56px',
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '17px',
          color: '#ffffff',
          backgroundColor: '#5534DA',
          borderRadius: '8px',
        },
        // 흰색 버튼
        // 대시보드 생성 모달(m), 할일 수정 모달(m), 할일 생성 모달(m),
        // 컬럼 추가 모달(m), 컬럼 수정 모달(m), 초대하기 모달(m)
        '.btn_modal_small_white': {
          width: '140px',
          height: '42px',
          padding: '12px 56px',
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '17px',
          color: '#787486',
          backgroundColor: '#FFFFFF',
          border: '1px solid #D9D9D9',
          borderRadius: '8px',
        },
        // 보라색 버튼
        // 내 대시보드 -> 초대받은 대시보드 -> 수락 버튼(d)
        // 대시보드 수정 -> 변경 버튼(d, t)
        // 마이페이지 -> 저장, 변경 버튼(d, t)
        '.btn_desktop_purple': {
          width: '84px',
          height: '32px',
          padding: '7px 29px',
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '17px',
          color: '#ffffff',
          backgroundColor: '#5534DA',
          borderRadius: '4px',
        },
        // 흰색 버튼
        // 내 대시보드 -> 초대받은 대시보드 -> 거절 버튼(d)
        // 대시보드 수정 -> 삭제, 취소 버튼(d, t)
        '.btn_desktop_white': {
          width: '85px',
          height: '32px',
          padding: '7px 25px',
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '17px',
          color: '#5534DA',
          backgroundColor: '#ffffff',
          border: '1px solid #D9D9D9',
          borderRadius: '4px',
        },
        // 보라색 버튼
        // 대시보드 수정 -> 변경 버튼(m)
        '.btn_small_purple': {
          width: '84px',
          height: '32px',
          padding: '7px 29px',
          fontSize: '12px',
          fontWeight: '500',
          lineHeight: '14px',
          color: '#ffffff',
          backgroundColor: '#5534DA',
          borderRadius: '4px',
        },
        // 흰색 버튼
        // 대시보드 수정 -> 삭제, 취소 버튼(m)
        '.btn_small_white': {
          width: '52px',
          height: '28px',
          padding: '7px 9px',
          fontSize: '12px',
          fontWeight: '500',
          lineHeight: '14px',
          color: '#5534DA',
          backgroundColor: '#ffffff',
          border: '1px solid #D9D9D9',
          borderRadius: '4px',
        },
        // 보라색 버튼
        // 내 대시보드 -> 초대받은 대시보드 수락 버튼(t)
        '.btn_tablet_purple': {
          width: '72px',
          height: '30px',
          padding: '6px 20px',
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '17px',
          color: '#ffffff',
          backgroundColor: '#5534DA',
          borderRadius: '4px',
        },
        // 흰색 버튼
        // 내 대시보드 -> 초대받은 대시보드 거절 버튼(t)
        '.btn_tablet_white': {
          width: '73px',
          height: '30px',
          padding: '6px 20px',
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '17px',
          color: '#5534DA',
          backgroundColor: '#ffffff',
          border: '1px solid #D9D9D9',
          borderRadius: '4px',
        },
        // 보라색 버튼
        // 내 대시보드 -> 초대받은 대시보드 수락 버튼(m)
        '.btn_mobile_purple': {
          width: '109px',
          height: '28px',
          padding: '7px 37px',
          fontSize: '12px',
          fontWeight: '500',
          lineHeight: '14px',
          color: '#ffffff',
          backgroundColor: '#5534DA',
          borderRadius: '4px',
        },
        // 흰색 버튼
        // 내 대시보드 -> 초대받은 대시보드 거절 버튼(m)
        '.btn_mobile_white': {
          width: '109px',
          height: '28px',
          padding: '7px 37px',
          fontSize: '12px',
          fontWeight: '500',
          lineHeight: '14px',
          color: '#5534DA',
          backgroundColor: '#ffffff',
          border: '1px solid #D9D9D9',
          borderRadius: '4px',
        },
        // 랜딩페이지 로그인 버튼
        '.btn_landing_login': {
          width: '235px',
          height: '42px',
          borderRadius: '8px',
          backgroundColor: '#5534DA',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        // 회색 버튼
        // 할일 카드 모달 -> 댓글 입력 버튼(d)
        '.btn_todo_modal_desktop_disabled': {
          width: '85px',
          height: '32px',
          padding: '7px 29px',
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '17px',
          color: '#D9D9D9',
          backgroundColor: '#ffffff',
          border: '1px solid #D9D9D9',
          borderRadius: '4px',
        },
        // 랜딩페이지 로그인 버튼
        '.btn_landing_login': {
          width: '235px',
          height: '42px',
          borderRadius: '8px',
          backgroundColor: '#5534DA',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        // 로그인, 회원가입 페이지 데스크탑, 테블릿 회색(비활성화) 버튼
        '.btn_login_large_disabled': {
          width: '100%',
          height: '50px',
          fontSize: '18px',
          fontWeight: '500',
          lineHeight: '22px',
          color: '#ffffff',
          backgroundColor: '#9FA6B2',
          borderRadius: '8px',
        },
        // 로그인, 회원가입 페이지 데스크탑, 테블릿 보라색(활성화) 버튼
        '.btn_login_large_active': {
          width: '100%',
          height: '50px',
          fontSize: '18px',
          fontWeight: '500',
          lineHeight: '22px',
          color: '#ffffff',
          backgroundColor: '#5534DA',
          borderRadius: '8px',
        },
        // 회색 테두리 스타일링
        '.border-1px-solid-gray-30': {
          border: '1px solid #D9D9D9',
        },
        // 회색 버튼
        // 할일 수정 모달(d, t), 할일 생성 모달(d, t)
        '.btn_modal_large_gray': {
          width: '120px',
          height: '48px',
          padding: '14px 46px',
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '19px',
          color: '#ffffff',
          backgroundColor: '#9FA6B2',
          borderRadius: '8px',
        },
        // 회색 버튼
        // 할일 수정 모달(m), 할일 생성 모달(m)
        '.btn_modal_small_gray': {
          width: '138px',
          height: '42px',
          padding: '12px 56px',
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '17px',
          color: '#ffffff',
          backgroundColor: '#9FA6B2',
          borderRadius: '8px',
        },
        // 보라색 버튼
        // 내 대시보드 -> 초대받은 대시보드 -> 수락 버튼(d)
        '.btn_desktop_purple_acc': {
          width: '84px',
          height: '32px',
          padding: '7px 25px',
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '17px',
          color: '#ffffff',
          backgroundColor: '#5534DA',
          borderRadius: '4px',
        },
        // 흰색 버튼
        // 내 대시보드 -> 초대받은 대시보드 -> 거절 버튼(d)
        '.btn_desktop_white_rej': {
          width: '85px',
          height: '32px',
          padding: '7px 25px',
          fontSize: '14px',
          fontWeight: '500',
          lineHeight: '17px',
          color: '#5534DA',
          backgroundColor: '#ffffff',
          border: '1px solid #D9D9D9',
          borderRadius: '4px',
        },
      });
    },
  ],
};
