// import instance from "@/lib/axios";
import PaginationBar from '@/components/MyDashboard/PaginationBar';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';

import MembersList from './MembersList';

const DashboardMembersEdit = () => {
  //members 상태를 배열로 초기화
  const [members, setMembers] = useState<
    { nickname: string; profileImage: string | null; id: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const size = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardId = 9765;

        const res = await axios.get(`members`, {
          params: {
            page,
            size,
            dashboardId,
          },
        });

        // "isOwner": true 값을 제외하고 nickname만 추출
        const membersData = res.data.members
          .filter((member: { isOwner: boolean }) => !member.isOwner)
          .map(
            (member: {
              nickname: string;
              profileImage: string | null;
              id: number;
            }) => ({
              nickname: member.nickname,
              profileImage: member.profileImage,
              id: member.id,
            }),
          );

        setMembers(membersData);
        setTotalPage(Math.ceil(res.data.totalCount / size));
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleDeleteMember = async (id: number) => {
    try {
      await axios.delete(`members/${id}`);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id),
      );
      alert('Member deleted successfully');
    } catch (error) {
      console.error('Failed to delete member:', error);
      alert('Failed to delete member');
    }
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="px-20">
      <div className="flex h-[404px] w-[620px] flex-col rounded-lg bg-white px-24 pt-25">
        <div className="flex items-center justify-between">
          <div className="mb-27 text-xl font-bold">구성원</div>
          <div className="mb-24 mt-8 flex items-center justify-end">
            {totalPage > 1 && (
              <>
                <p className="mr-12 text-xs font-normal">
                  {totalPage}페이지 중 {page}
                </p>
                <PaginationBar
                  totalPage={totalPage}
                  activePage={page}
                  onPageChange={onPageChange}
                />
              </>
            )}
          </div>
        </div>
        <p className="font-sm mb-8 text-[1.125rem] text-[#9FA6B2]">이름</p>

        <MembersList members={members} onDeleteMember={handleDeleteMember} />
      </div>
    </div>
  );
};

export default DashboardMembersEdit;
