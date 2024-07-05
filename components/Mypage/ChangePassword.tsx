const ChangePassword = () => {
  return (
    <form className="flex max-w-480 flex-col px-20 pb-20 pt-28 md:max-w-620 md:px-28 md:pb-28">
      <div>
        <h1 className="text-20 font-bold md:text-24">비밀번호 변경</h1>
      </div>
      <div className="flex flex-col gap-16 pt-24 md:gap-20">
        <div className="flex flex-col gap-10">
          <h2 className="text-18">현재 비밀번호</h2>
          <input
            className="h-42 w-full rounded-6 border border-gray-30 pl-16 text-14 outline-none md:h-48 md:text-16"
            placeholder="현재 비밀번호 입력"
            type="password"
            autoComplete="password"
          />
        </div>
        <div className="flex flex-col gap-10">
          <h2 className="text-18">새 비밀번호</h2>
          <input
            className="h-42 w-full rounded-6 border border-gray-30 pl-16 text-14 outline-none md:h-48 md:text-16"
            placeholder="새 비밀번호 입력"
            type="password"
            autoComplete="password"
          />
        </div>
        <div className="flex flex-col gap-10">
          <h2 className="text-18">새 비밀번호 확인</h2>
          <input
            className="h-42 w-full rounded-6 border border-gray-30 pl-16 text-14 outline-none md:h-48 md:text-16"
            placeholder="새 비밀번호 입력"
            type="password"
            autoComplete="password"
          />
        </div>
        <div className="flex justify-end">
          <button type='submit' className="h-28 whitespace-nowrap text-12 btn_desktop_purple md:text-14">
            변경
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
