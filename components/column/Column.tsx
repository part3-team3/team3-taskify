// Assuming getColumn is an async function that fetches the JSON data
import AddColumnModal from '@/components/column/AddColumnModal';
import { addColumn } from '@/pages/api/addColumn';
// import { deleteColumn } from '@/pages/api/deleteColumn';
import { getColumn } from '@/pages/api/getColumn';
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
const dashboardId = 9872; // 대시보드아이디 정하기
// const columnId = 33263; // 컬럼아이디 정하기

const Column: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  // const [showAddColumn, setShowAddColumn] = useState(false);
  // 각 컬럼의 showAddColumn 상태를 관리하는 객체 상태 초기화
  const [showAddColumnStates, setShowAddColumnStates] = useState<{
    [key: number]: boolean;
  }>(columns.reduce((acc, column) => ({ ...acc, [column.id]: false }), {}));
  // 클릭 이벤트 핸들러
  const toggleShowAddColumn = (columnId: number) => {
    setShowAddColumnStates((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  useEffect(() => {
    const fetchColumns = async () => {
      const data = await getColumn(dashboardId.toString()); // 컬럼 api 받아오기
      setColumns(data.data); // JSON사용하기 위해 변경
    };

    fetchColumns();
  }, []);

  const handleAddColumn = async () => {
    if (columns.length < 10) {
      const newColumn: Column = {
        id: columns.length + 1,
        title: `${columns.length + 1}열입니다`,
        teamId: '',
        dashboardId: 0,
        createdAt: '',
        updatedAt: '',
      };
      await addColumn(dashboardId);
      setColumns([...columns, newColumn]);
    }
  };

  const addTodoModal = (index: number) => {
    alert(`${index}행입니다. 할일 카드 모달 연결 예정입니다~`);
  };

  return (
    <>
      <Image
        className="ml-auto flex"
        src="/images/logo/gom.png"
        width={38}
        height={38}
        alt="a bear avatar"
      />
      <div className="flex flex-wrap lg:mx-[30px] lg:h-[100vh] lg:flex-nowrap lg:overflow-x-auto">
        {columns.map((column, index) => (
          <div
            key={column.id}
            className="mx-[30px] my-[22px] flex h-full w-full min-w-[308px] flex-wrap bg-white lg:h-[40px] lg:w-[354px]"
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
            {showAddColumnStates[column.id] && <AddColumnModal />}
            <button
              onClick={() => addTodoModal(index)}
              className="bg-blue-500 flex h-40 w-full items-center justify-center rounded text-white border-1px-solid-gray-30"
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
          className="mb-4 ml-20 flex h-70 w-full min-w-[308px] items-center justify-center space-x-12 rounded-lg bg-white text-black border-1px-solid-gray-30 lg:w-[354px]"
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
    </>
  );
};

export default Column;
