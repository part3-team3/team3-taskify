import ColumnCard from '@/components/column/ColumnCard';
import EditColumnModal from '@/components/column/EditColumnModal';
import { Card } from '@/types/card';
import Image from 'next/image';
import React, { useState } from 'react';

interface Column {
  id: number;
  color: string;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}
interface ColumnProps {
  column: Column;
  cards: Card[];
  setShowEditColumnModal: (columnId: number | null) => void;
  handleDeleteColumn: (columnId: number) => Promise<void>;
  addTodoModal: (index: number) => void;
}

const ColumnBox: React.FC<ColumnProps> = ({
  column,
  cards,
  handleDeleteColumn,
  addTodoModal,
}) => {
  const [showEditColumnModal, setShowEditColumnModalLocal] = useState<
    number | null
  >(null);
  const [columnTitle, setColumnTitle] = useState(column.title); // 컬럼 제목 상태 추가

  const updateColumnTitle = (newTitle: string) => {
    setColumnTitle(newTitle);
  };

  return (
    <div
      key={column.id}
      className="mx-[30px] my-[22px] flex h-full w-full min-w-[314px] flex-wrap bg-gray-10 xl:h-[40px] xl:w-[354px]"
    >
      <div
        className="my-[22px] mr-15 w-[8px]"
        style={{ backgroundColor: column.color }}
      >
        ㅇ
      </div>
      <div className="my-[22px] mr-15 font-[700]"> {columnTitle}</div>{' '}
      {/* 변경된 컬럼 제목 사용 */}
      <div className="my-[22px] mr-auto flex h-[20px] w-[20px] items-center justify-center rounded bg-[#EEEEEE] text-xs text-[#787496]">
        {cards.filter((card) => card.columnId === column.id).length}
      </div>
      <Image
        onClick={() => setShowEditColumnModalLocal(column.id)}
        src="/images/icon/ic-setting.svg"
        width={24}
        height={24}
        alt="settings button"
        className="cursor-pointer"
      />
      {showEditColumnModal && showEditColumnModal === column.id && (
        <EditColumnModal
          columnId={column.id}
          closeModal={() => setShowEditColumnModalLocal(null)}
          onEditColumn={updateColumnTitle} // 컬럼 제목 변경 함수 전달
          handleDeleteColumn={handleDeleteColumn}
          dashboardId={column.dashboardId}
        />
      )}
      <button
        onClick={() => addTodoModal(column.id)}
        className="bg-blue-500 mb-[16px] flex h-40 w-full items-center justify-center rounded bg-white border-1px-solid-gray-30"
      >
        <Image
          src="/images/icon/ic-color-add.svg"
          width={22}
          height={22}
          alt="add button"
        />
      </button>
      {cards.some((card) => card.columnId === column.id) && (
        <>
          {cards
            .filter((card) => card.columnId === column.id)
            .map((card) => (
              <ColumnCard card={card} key={card.id} />
            ))}
        </>
      )}
    </div>
  );
};

export default ColumnBox;
