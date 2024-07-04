import { getInvitedDashboard, getSearchDashboard } from '@/pages/api/mydashboard/getInvitedDashboard';
import { Invitation, InvitationResponse } from '@/types/myDashboardTypes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



import InvitedDashboardItem from './InvitedDashboardItem';
import SearchBar from './SearchBar';


const InvitedDashboardSection: React.FC = () => {
  const [allInvitedDashboardList, setAllInvitedDashboardList] = useState<
    Invitation[]
  >([]);
  const router = useRouter();
  const { title } = router.query;

  const [cursorId, setCursorId] = useState<number | null>(null);
  const [cursor, setCursor] = useState<number | null | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getInvitedDashboardData = async (
      cursor?: number | null,
    ) => {
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
    const getSearchDashboardData = async (query: string | string[] | undefined) => {
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

  return (
    <>
      <div className="mx-auto w-fit">
        <SearchBar
          initialValue={title as string}
        />

        <ul className="">
          {allInvitedDashboardList.length > 0 && (
            <div>
              {allInvitedDashboardList &&
                allInvitedDashboardList.map((invitedDashboard) => {
                  return (
                    <li className="w-fit" key={invitedDashboard.id}>
                      <InvitedDashboardItem
                        invitedDashboard={invitedDashboard}
                      />
                    </li>
                  );
                })}
              <div id="observer" className="h-10"></div>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};
export default InvitedDashboardSection;