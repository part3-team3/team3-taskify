import PaginationBar from '@/components/MyDashboard/PaginationBar';
import axios from '@/lib/axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import MembersList from './MembersList';

const DashboardMembersEdit = () => {
  const router = useRouter();
  const { dashboardId } = router.query;

  const [members, setMembers] = useState<
    { nickname: string; profileImage: string | null; id: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const size = 4;

  useEffect(() => {
    if (!dashboardId) return; // dashboardId가 존재하지 않을 경우 fetchData 호출하지 않음

    const fetchData = async () => {
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
          .filter((member: { isOwner: any }) => !member.isOwner)
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
    <div className="px-20">
      <div className="flex h-[404px] w-[620px] flex-col rounded-lg bg-white px-24 pt-25">
        <div className="flex items-center justify-between">
          <div className="mb-27 text-xl font-bold">구성원</div>
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
        <p className="font-sm mb-8 text-[1.125rem] text-[#9FA6B2]">이름</p>

        <MembersList members={members} onDeleteMember={handleDeleteMember} />
      </div>
    </div>
  );
};

export default DashboardMembersEdit;
