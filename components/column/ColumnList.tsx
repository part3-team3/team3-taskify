// import ColumnCard from '@/components/column/ColumnCard';
// import EditColumnModal from '@/components/column/EditColumnModal';
import axios from '@/lib/axios';
import { addColumn } from '@/pages/api/column/addColumn';
import { deleteColumn } from '@/pages/api/column/deleteColumn';
import { getColumn } from '@/pages/api/column/getColumn';
import ColumnType from '@/types/column';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Column from './Column';

const ColumnComponent = () => {
  const router = useRouter();
  const dashboardId = Number(router.query.dashboardId);
  const [columns, setColumns] = useState<ColumnType[]>();
  const [color, setColor] = useState('');
  const [isColumnDelete, setIsColumnDelete] = useState(false);

  useEffect(() => {
    const fetchColumns = async () => {
      if (dashboardId) {
        const data = await getColumn(dashboardId);
        const dashboardData = await axios.get(`/dashboards/${dashboardId}`);

        setColumns(data.data);
        setColor(dashboardData.data.color);
        console.log(color);
      } else {
        console.error('dashboardId is not a valid number');
      }
    };
    fetchColumns();
  }, [dashboardId, isColumnDelete]);

  const handleAddColumn = async () => {
    if (columns !== undefined && columns.length <= 10) {
      const newColumn = await addColumn(dashboardId);
      setColumns([...columns, newColumn]);
    }
  };

  const handleDeleteColumn = async (columnId: number) => {
    await deleteColumn(columnId);
    setIsColumnDelete(!isColumnDelete);
    // setColumns(columns.filter((column) => column.id !== columnId));
  };

  if (!columns) return null;

  return (
    <>
      <div className="flex flex-wrap bg-gray-10 xl:h-[1010px] xl:flex-nowrap xl:overflow-x-auto xl:px-20">
        {columns.map((column) => (
          <Column
            onDelete={handleDeleteColumn}
            color={color}
            dashboardId={dashboardId}
            column={column}
            key={column.id}
          />
        ))}
        <button
          onClick={handleAddColumn}
          disabled={columns.length >= 10}
          className="mb-4 ml-20 mt-68 flex h-70 w-full min-w-[308px] items-center justify-center space-x-12 rounded-lg bg-white text-black border-1px-solid-gray-30 xl:w-[354px]"
        >
          <div className="font-bold">새로운 컬럼 추가하기</div>
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
