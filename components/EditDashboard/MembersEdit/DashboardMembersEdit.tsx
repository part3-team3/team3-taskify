import PaginationBar from '@/components/MyDashboard/PaginationBar';
import axios from '@/lib/axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import MembersList from './MembersList';

const DashboardMembersEdit = () => {
  const router = useRouter();
  const dashboardId = Number(router.query.dashboardId);

  const [members, setMembers] = useState<
    { nickname: string; profileImageUrl: string | null; id: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const size = 4;

  useEffect(() => {
    if (!dashboardId) return; // dashboardId가 존재하지 않을 경우 fetchData 호출하지 않음

    const fetchData = async () => {
      if (!dashboardId || isNaN(Number(dashboardId))) return;

      try {
        const newSize = size + 1;

        const res = await axios.get(`members`, {
          params: {
            page,
            size: newSize,
            dashboardId,
          },
        });

        const membersData = res.data.members
          .filter((member: { isOwner: boolean }) => !member.isOwner)
          .map(
            (member: {
              nickname: string;
              profileImageUrl: string | null;
              id: number;
            }) => ({
              nickname: member.nickname,
              profileImageUrl: member.profileImageUrl,
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
  }, [page, dashboardId]);

  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleDeleteMember = async (id: number) => {
    try {
      await axios.delete(`members/${id}`);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id),
      );
      alert('구성원을 성공적으로 삭제했습니다');
    } catch (error) {
      console.error('Failed to delete member:', error);
      alert('구성원 삭제를 실패했습니다');
    }
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="px-12 md:px-20">
      <div className="flex h-337 w-284 flex-col rounded-lg bg-white px-12 pt-25 sm:h-404 sm:w-544 md:px-20 xl:h-404 xl:w-620">
        <div className="flex h-50 items-center justify-between pb-0 md:h-60">
          <div className="mb-13 text-xl font-bold md:mb-27 md:text-24">
            구성원
          </div>
          <div className="mb-24 flex items-center justify-end">
            <p className="mr-12 text-xs font-normal">
              {totalPage}페이지 중 {page}
            </p>
            <PaginationBar
              totalPage={totalPage}
              activePage={page}
              onPageChange={onPageChange}
            />
          </div>
        </div>
        <p className="mb-5 text-14 text-[#9FA6B2] md:mb-12 md:text-16">이름</p>

        <MembersList members={members} onDeleteMember={handleDeleteMember} />
      </div>
    </div>
  );
};

export default DashboardMembersEdit;
