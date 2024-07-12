import TodoCreateModal from '@/components/TodoModalForm/TodoCreateModal';
import EditColumnModal from '@/components/column/EditColumnModal';
import { getCardList } from '@/pages/api/column/getCardList';
import { Card } from '@/types/card';
import ColumnType from '@/types/column';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ColumnCard from './ColumnCard';

const Column = ({
  color,
  columns,
  column,
  onEdit,
  onDelete,
  dashboardId,
}: {
  color: string;
  columns: ColumnType[];
  column: ColumnType;
  onEdit: (columnId: number, title: string) => Promise<void>;
  onDelete: (columnId: number) => Promise<void>;
  dashboardId: number;
}) => {
  const [cards, setCards] = useState<Card[]>();
  const [cardTotalCount, setCardTotalCount] = useState();
  const [refetch, setRefetch] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const dashboardColor: { [colorKey: string]: string } = {
    '#7AC555': 'bg-green',
    '#760DDE': 'bg-purple',
    '#FFA500': 'bg-orange',
    '#E876EA': 'bg-pink',
    '#76A5EA': 'bg-blue',
  };

  const refetchColumn = () => setRefetch((prev) => !prev);

  // const openModal = () => setIsSettingOpen(true);
  const closeModal = () => setIsSettingOpen(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  useEffect(() => {
    const fetchCards = async () => {
      const cardList = await getCardList(column.id);
      setCards(cardList.cards);
      setCardTotalCount(cardList.totalCount);
    };
    fetchCards();
  }, [refetch]);

  const handleSettingOpen = () => {
    setIsSettingOpen(true);
  };

  if (!cards) return null;

  return (
    <div
      key={column.id}
      className="mx-[30px] my-[22px] flex h-full w-full min-w-[314px] flex-wrap items-center bg-gray-10 xl:h-[40px] xl:w-[354px]"
    >
      <div
        className={`${dashboardColor[color]} my-22 mr-8 h-8 w-8 rounded-full`}
      />
      <div className="my-[22px] mr-15 font-[700]">{column.title}</div>
      <div className="my-[22px] mr-auto flex h-[20px] w-[20px] items-center justify-center rounded bg-[#EEEEEE] text-xs text-[#787496]">
        {cardTotalCount}
      </div>
      <Image
        onClick={handleSettingOpen}
        src="/images/icon/ic-setting.svg"
        width={24}
        height={24}
        alt="settings button"
        className="cursor-pointer"
      />
      {isSettingOpen && (
        <EditColumnModal
          columnTitle={column.title}
          columnId={column.id}
          closeModal={closeModal}
          onEdit={onEdit}
          onDelete={onDelete}
          dashboardId={dashboardId}
        />
      )}
      <>
        <button
          onClick={openCreateModal}
          className="bg-blue-500 mb-[16px] flex h-40 w-full items-center justify-center rounded bg-white border-1px-solid-gray-30"
        >
          <Image
            src="/images/icon/ic-color-add.svg"
            width={22}
            height={22}
            alt="add button"
          />
        </button>
        <TodoCreateModal
          refetchColumn={refetchColumn}
          columnId={column.id}
          dashboardId={dashboardId}
          isModalOpen={isCreateModalOpen}
          closeModal={closeCreateModal}
          setIsModalOpen={setIsCreateModalOpen}
        />
        <div className="flex flex-col w-full gap-10 xl:gap-16">
          {cards?.map((card) => (
            <ColumnCard
              card={card}
              columns={columns}
              columnId={column.id}
              dashboardId={dashboardId}
              refetchColumn={refetchColumn}
              key={card.id}
            />
          ))}
        </div>
      </>
    </div>
  );
};
export default Column;
