
const DashboardMembersEdit = () => {
  return (
    <div className="px-20">
      <div className="flex h-[404px] w-[620px] flex-col rounded-lg bg-white px-24 pt-25">
        <div className="flex justify-between">
          <div className="mb-30 text-xl font-bold">구성원</div>
          {/* <div className="text-sm">{pages}페이지 중{currentPage}</div> */}
        </div>

        <p className="font-sm text-[1.125rem] text-[#9FA6B2]">이름</p>

        <div className="flex justify-end"></div>
      </div>
    </div>
  );
};

export default DashboardMembersEdit;
