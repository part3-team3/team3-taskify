import { getInvitedDashboard, getSearchDashboard } from '@/pages/api/mydashboard/getInvitedDashboard';
import { Invitation, InvitationResponse } from '@/types/myDashboardTypes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



import InvitedDashboardItem from './InvitedDashboardItem';
import SearchBar from './SearchBar';


interface InvitedDashboardSectionProps {
  onDashboardCreated: () => void;
}
const InvitedDashboardSection: React.FC<InvitedDashboardSectionProps> = ({
  onDashboardCreated,
}:InvitedDashboardSectionProps) => {
  const [allInvitedDashboardList, setAllInvitedDashboardList] = useState<
    Invitation[]
  >([]);
  const router = useRouter();
  const { title } = router.query;

  const [cursorId, setCursorId] = useState<number | null>(null);
  const [cursor, setCursor] = useState<number | null | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getInvitedDashboardData = async (cursor?: number | null) => {
      if (null === cursor) return;
      setIsLoading(true);
      try {
        const getInvitedDashboardRes: InvitationResponse =
          await getInvitedDashboard(cursor);

        setAllInvitedDashboardList((prevDashboards) => [
          ...prevDashboards,
          ...getInvitedDashboardRes.invitations.filter(
            (dashboard) =>
              !prevDashboards.some(
                (prevDashboard) => prevDashboard.id === dashboard.id,
              ),
          ),
        ]);
        setCursorId(getInvitedDashboardRes.cursorId);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getInvitedDashboardData(cursor);
  }, [cursor]);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      // isIntersecting 기본 프로퍼티 알아보기
      if (
        target.isIntersecting &&
        !isLoading &&
        cursorId !== null &&
        cursor !== cursorId
      ) {
        setCursor(cursorId); // 스크롤하다가 마지막 댓글의 커서 Id를 cursor에 저장함.
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });

    const observerTarget = document.getElementById('observer'); // 최하단 요소를 관찰 대상으로 지정함
    if (observerTarget) {
      // 관찰 시작
      observer.observe(observerTarget);
    }

    return () => {
      if (observerTarget) {
        observer.unobserve(observerTarget);
      }
    };
  }, [cursorId, isLoading]);

  useEffect(() => {
    const getSearchDashboardData = async (
      query: string | string[] | undefined,
    ) => {
      try {
        const getSearchDashboardRes: InvitationResponse =
          await getSearchDashboard(query as string);
        setAllInvitedDashboardList(getSearchDashboardRes.invitations);
      } catch (err) {
        console.log(err);
      }
    };
    getSearchDashboardData(title);
  }, [title]);

  const handleInvitationAction = (invitationId: number) => {
    setAllInvitedDashboardList((prevDashboards) =>
      prevDashboards.filter((dashboard) => dashboard.id !== invitationId),
    );
  };

  const handleDashboardCreated = () => {
    onDashboardCreated();
  };

  return (
    <>
      <div className="mx-auto">
        <ul className="">
          {allInvitedDashboardList.length > 0 ? (
            <div className="mt-24 min-h-screen w-260 rounded-lg bg-white px-16 py-24 md:w-504 md:px-28 md:py-32 xl:w-1022">
              <p className="mb-20 text-xl font-bold md:text-2xl">
                초대받은 대시보드
              </p>

              <SearchBar initialValue={title as string} />
              <div className="md:text-normal hidden md:mb-4 md:flex md:text-base md:text-gray-40">
                <p className="md:w-182 xl:w-348">이름</p>
                <p className="md:w-112 xl:w-302">초대자</p>
                <p className="md:w-154 xl:w-316">수락 여부</p>
              </div>
              {allInvitedDashboardList.map((invitedDashboard) => {
                return (
                  <li className="w-full" key={invitedDashboard.id}>
                    <InvitedDashboardItem
                      invitedDashboard={invitedDashboard}
                      onAction={handleInvitationAction}
                      onDashboardCreated={handleDashboardCreated}
                    />
                  </li>
                );
              })}
              <div id="observer" className="h-10"></div>
            </div>
          ) : (
            <div className="mt-24 h-400 w-260 rounded-lg bg-white px-16 py-24 md:h-400 md:w-504 md:px-28 md:py-32 xl:h-400 xl:w-1022">
              <p className="text-xl font-bold md:text-2xl">초대받은 대시보드</p>
              <div className="mt-105 flex flex-col items-center justify-center md:mt-67 xl:mt-66">
                <div className="relative h-60 w-60 md:h-100 md:w-100">
                  <Image
                    fill
                    src="/images/icon/ic-no-dashboard.svg"
                    alt="초대받은 대시보드 없음"
                  />
                </div>
                <p className="w-fit text-sm font-normal text-gray-40 md:text-lg">
                  아직 초대받은 대시보드가 없어요
                </p>
              </div>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};
export default InvitedDashboardSection;