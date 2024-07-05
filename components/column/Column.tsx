import ColumnBox from '@/components/column/ColumnBox';
import NewColumnModal from '@/components/column/NewColumnModal';
import { addColumn } from '@/pages/api/column/addColumn';
import { deleteColumn } from '@/pages/api/column/deleteColumn';
import { getCardList } from '@/pages/api/column/getCardList';
import { getColumn } from '@/pages/api/column/getColumn';
import { Card } from '@/types/card';
// import { Card } from '@/types/card';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Column {
  id: number;
  color: string;
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
  const [showNewColumnModal, setShowNewColumnModal] = useState(false);
  const [showEditColumnModal, setShowEditColumnModal] = useState<number | null>(
    null,
  );
  // const [showAddColumnStates, setShowAddColumnStates] = useState<{
  //   [key: number]: boolean;
  // }>({});
  const [cards, setCards] = useState<Card[]>([]);

  // const toggleShowAddColumn = (columnId: number) => {
  //   setShowAddColumnStates((prevState) => ({
  //     ...prevState,
  //     [columnId]: !prevState[columnId],
  //   }));
  // };

  const handleDeleteColumn = async (columnId: number) => {
    await deleteColumn(columnId);
    setColumns(columns.filter((column) => column.id !== columnId));
  };

  const handleConfirmAddColumn = () => {
    handleAddColumn(); // 실제 컬럼 추가 로직을 실행
    setShowNewColumnModal(false); // 모달 닫기
  };

  const handleOpenNewColumnModal = () => {
    setShowNewColumnModal(true); // 모달 열기
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
      const columnTitle = localStorage.getItem('newColumnTitle') || '';
      const newColumn = await addColumn(dashboardId, columnTitle);
      setColumns([...columns, newColumn]);
    }
  };

  const addTodoModal = (index: number) => {
    alert(`${index}행입니다. 할일 카드 모달 연결 예정입니다~`);
  };

  return (
    <>
      <div className="flex flex-wrap bg-gray-10 xl:mx-[30px] xl:h-[1010px] xl:flex-nowrap xl:overflow-x-auto">
        {columns.map((column) => (
          <ColumnBox
            key={column.id}
            column={column}
            setShowEditColumnModal={setShowEditColumnModal}
            handleDeleteColumn={handleDeleteColumn}
            addTodoModal={addTodoModal}
            cards={cards.filter((card) => card.columnId === column.id)}
            showEditColumnModal={showEditColumnModal}
          />
        ))}
        <button
          onClick={handleOpenNewColumnModal}
          disabled={columns.length >= 10}
          className="mb-4 ml-20 mt-68 flex h-70 w-full min-w-[308px] items-center justify-center space-x-12 rounded-lg bg-white text-black border-1px-solid-gray-30 xl:w-[354px]"
        >
          <div className="font-pretendard font-bold">새로운 컬럼 추가하기</div>
          <Image
            src="/images/icon/ic-color-add.svg"
            width={22}
            height={22}
            alt="button to add a column"
          />
        </button>
      </div>
      {showNewColumnModal && (
        <NewColumnModal
          closeModal={() => setShowNewColumnModal(false)}
          onAddColumn={handleConfirmAddColumn}
          dashboardId={dashboardId}
        />
      )}
    </>
  );
};

export default ColumnComponent;
