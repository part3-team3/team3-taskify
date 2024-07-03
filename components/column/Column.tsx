import ColumnCard from '@/components/ColumnCard';
import EditColumnModal from '@/components/column/EditColumnModal';
import { addColumn } from '@/pages/api/column/addColumn';
import { deleteColumn } from '@/pages/api/column/deleteColumn';
import { getCardList } from '@/pages/api/column/getCardList';
import { getColumn } from '@/pages/api/column/getColumn';
// import { getUsers } from '@/pages/api/column/getUsers';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Column {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

//   "assigneeUserId": 3976, "dashboardId": 9728, "columnId": 32815,
const dashboardId = 9728; //api로 변경 예정

const Column = ({ columnId }) => {
  const [columns, setColumns] = useState<Column[]>([]);
  // 각 컬럼의 showAddColumn 상태를 관리하는 객체 상태 초기화
  const [showAddColumnStates, setShowAddColumnStates] = useState<{
    [key: number]: boolean;
  }>(columns.reduce((acc, column) => ({ ...acc, [column.id]: false }), {}));

  const toggleShowAddColumn = (columnId: number) => {
    // 현재 클릭된 컬럼 ID를 제외하고 모든 컬럼의 모달 표시 상태를 false로 설정
    const updatedStates = Object.keys(showAddColumnStates).reduce(
      (acc, id) => {
        acc[parseInt(id)] = false;
        return acc;
      },
      {} as { [key: number]: boolean },
    );

    // 현재 클릭된 컬럼의 모달 표시 상태를 토글
    updatedStates[columnId] = !showAddColumnStates[columnId];

    setShowAddColumnStates(updatedStates);
  };

  const handleDeleteColumn = async (columnId: number) => {
    await deleteColumn(columnId);
    setColumns(columns.filter((column) => column.id !== columnId));
  };
  useEffect(() => {
    const fetchColumns = async () => {
      const data = await getColumn(dashboardId.toString()); // 컬럼 api 받아오기
      setColumns(data.data); // JSON사용하기 위해 변경
    };
    fetchColumns();
  }, []);
  // cards
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Define an async function to fetch cards
    const fetchCards = async () => {
      try {
        const fetchedCards = await getCardList(columnId);
        setCards(fetchedCards); // Update state with fetched cards
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    };

    fetchCards(); // Call the fetch function
  }, [columnId]); // Dependency array, re-fetch if columnId changes

  const handleAddColumn = async () => {
    if (columns.length <= 10) {
      await addColumn(dashboardId);
      const newColumn = columns[columns.length - 1];
      setColumns([...columns, newColumn]);
    }
  };
  const addTodoModal = (index: number) => {
    alert(`${index}행입니다. 할일 카드 모달 연결 예정입니다~`);
  };

  return (
    <>
      <div className="flex flex-wrap bg-gray-10 lg:mx-[30px] lg:h-[1010px] lg:flex-nowrap lg:overflow-x-auto">
        {columns.map((column, index) => (
          <div
            key={column.id}
            className="mx-[30px] my-[22px] flex h-full w-full min-w-[308px] flex-wrap bg-gray-10 lg:h-[40px] lg:w-[354px]"
          >
            <div className="my-[22px] mr-15 w-[8px]">ㅇ</div>
            <div className="my-[22px] mr-15 font-[700]"> {column.title}</div>
            <div className="my-[22px] mr-auto flex h-[20px] w-[20px] items-center justify-center rounded bg-[#EEEEEE] text-xs text-[#787496]">
              0
            </div>
            <Image
              onClick={() => toggleShowAddColumn(column.id)}
              src="/images/icon/ic-setting.svg"
              width={24}
              height={24}
              alt="settings button"
              className="cursor-pointer"
            />
            {showAddColumnStates[column.id] && (
              <EditColumnModal
                columnId={column.id}
                handleDeleteColumn={handleDeleteColumn}
              />
            )}
            <button
              onClick={() => addTodoModal(index)}
              className="bg-blue-500 flex h-40 w-full items-center justify-center rounded bg-white border-1px-solid-gray-30"
            >
              <Image
                src="/images/icon/ic-color-add.svg"
                width={22}
                height={22}
                alt="add button"
              />
            </button>
          </div>
        ))}
        <button
          onClick={handleAddColumn}
          disabled={columns.length >= 10}
          className="mb-4 ml-20 mt-68 flex h-70 w-full min-w-[308px] items-center justify-center space-x-12 rounded-lg bg-white text-black border-1px-solid-gray-30 lg:w-[354px]"
        >
          <div className="font-pretendard font-bold">새로운 컬럼 추가하기</div>
          <Image
            src="/images/icon/ic-color-add.svg"
            width={22}
            height={22}
            alt="button to add a column"
          />
        </button>
        <ColumnCard
          cards={cards.map((card) => ({
            id: card.id,
            title: card.title,
            description: card.description,
            tags: card.tags,
            dueDate: card.dueDate,
            assignee: {
              id: card.assignee.id,
              nickname: card.assignee.nickname,
              profileImageUrl: card.assignee.profileImageUrl,
            },
            imageUrl: card.imageUrl,
            teamId: card.teamId,
            dashboardId: card.dashboardId,
            columnId: card.columnId,
          }))}
        />
      </div>
    </>
  );
};

export default Column;
