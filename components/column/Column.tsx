import ColumnCard from '@/components/column/ColumnCard';
import EditColumnModal from '@/components/column/EditColumnModal';
import { addColumn } from '@/pages/api/column/addColumn';
import { deleteColumn } from '@/pages/api/column/deleteColumn';
import { getCardList } from '@/pages/api/column/getCardList';
import { getColumn } from '@/pages/api/column/getColumn';
import { Card } from '@/types/card';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Column {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

const ColumnComponent = () => {
  const router = useRouter();
  const dashboardId = Number(router.query.dashboardId);
  const [columns, setColumns] = useState<Column[]>([]);
  const [showAddColumnStates, setShowAddColumnStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [cards, setCards] = useState<Card[]>([]);

  const toggleShowAddColumn = (columnId: number) => {
    setShowAddColumnStates((prevState) => ({
      ...prevState,
      [columnId]: !prevState[columnId],
    }));
  };

  const handleDeleteColumn = async (columnId: number) => {
    await deleteColumn(columnId);
    setColumns(columns.filter((column) => column.id !== columnId));
  };

  useEffect(() => {
    const fetchColumns = async () => {
      if (!isNaN(dashboardId)) {
        const data = await getColumn(dashboardId);
        setColumns(data.data);
      } else {
        console.error('dashboardId is not a valid number');
      }
    };
    fetchColumns();
  }, [dashboardId]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const fetchedCards = await Promise.all(
          columns.map(async (column) => {
            const { cards } = await getCardList(column.id);
            return cards;
          }),
        );
        const flattenedCards = fetchedCards.flat();
        setCards(flattenedCards);
        console.log('카드 불러오기 성공');
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    };

    fetchCards();
  }, [columns]);

  const handleAddColumn = async () => {
    if (columns.length <= 10) {
      const newColumn = await addColumn(dashboardId);
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
            className="mx-[30px] my-[22px] flex h-full w-full min-w-[314px] flex-wrap bg-gray-10 lg:h-[40px] lg:w-[354px]"
          >
            <div className="my-[22px] mr-15 w-[8px]">ㅇ</div>
            <div className="my-[22px] mr-15 font-[700]"> {column.title}</div>
            <div className="my-[22px] mr-auto flex h-[20px] w-[20px] items-center justify-center rounded bg-[#EEEEEE] text-xs text-[#787496]">
              {/* 0 */}
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
            {column.id === column.id && (
              <>
                <button
                  onClick={() => addTodoModal(index)}
                  className="bg-blue-500 mb-[16px] flex h-40 w-full items-center justify-center rounded bg-white border-1px-solid-gray-30"
                >
                  <Image
                    src="/images/icon/ic-color-add.svg"
                    width={22}
                    height={22}
                    alt="add button"
                  />
                </button>
                {cards
                  .filter((card) => card.columnId === column.id)
                  .map((card) => (
                    <ColumnCard card={card} key={card.id} />
                  ))}
              </>
            )}
          </div>
        ))}
        <button
          onClick={handleAddColumn}
          disabled={columns.length >= 10}
          className="mb-4 ml-20 mt-68 flex h-70 w-full min-w-[308px] items-center justify-center space-x-12 rounded-lg bg-white text-black border-1px-solid-gray-30 lg:w-[354px]"
        >
          <div className="font-bold font-pretendard">새로운 컬럼 추가하기</div>
          <Image
            src="/images/icon/ic-color-add.svg"
            width={22}
            height={22}
            alt="button to add a column"
          />
        </button>
      </div>
    </>
  );
};

export default ColumnComponent;
