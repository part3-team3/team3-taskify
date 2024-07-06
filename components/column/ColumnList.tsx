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
import NewColumnModal from './NewColumnModal';

const ColumnList = () => {
  const router = useRouter();
  const dashboardId = Number(router.query.dashboardId);
  const [columns, setColumns] = useState<ColumnType[]>();
  const [color, setColor] = useState('');
  const [isColumnChange, setIsColumnChange] = useState(false);

  const [openCreateColumnModal, setOpenCreateColumnModal] = useState(false);

  const closeModal = () => setOpenCreateColumnModal(false);

  useEffect(() => {
    // 보내줘야 할 목록 ->
    const fetchColumns = async () => {
      if (dashboardId) {
        const data = await getColumn(dashboardId);
        const dashboardData = await axios.get(`/dashboards/${dashboardId}`);

        setColumns(data.data);
        setColor(dashboardData.data.color);
      } else {
        console.error('dashboardId is not a valid number');
      }
    };
    fetchColumns();
  }, [dashboardId, isColumnChange]);

  const openModalVisible = () => {
    setOpenCreateColumnModal(true);
  };

  const handleAddColumn = async (title: string) => {
    if (columns !== undefined && columns.length <= 10) {
      const newColumn = await addColumn({
        title,
        dashboardId,
      });
      setColumns([...columns, newColumn]);
      setOpenCreateColumnModal(false);
    }
  };

  const handleColumnNameEdit = async (columnId: number, newTitle: string) => {
    await axios.put(`columns/${columnId}`, { title: newTitle });
    setIsColumnChange(!isColumnChange);
  };

  const handleDeleteColumn = async (columnId: number) => {
    await deleteColumn(columnId);
    setIsColumnChange(!isColumnChange);
  };

  if (!columns) return null;

  return (
    <>
      <div className="flex flex-wrap bg-gray-10 xl:h-[1010px] xl:flex-nowrap xl:overflow-x-auto xl:px-20">
        {columns.map((column) => (
          <Column
            color={color}
            columns={columns}
            column={column}
            key={column.id}
            dashboardId={dashboardId}
            onDelete={handleDeleteColumn}
            onEdit={handleColumnNameEdit}
          />
        ))}
        <button
          onClick={openModalVisible}
          disabled={columns.length >= 10}
          className="mb-4 ml-20 mt-68 flex h-70 w-full min-w-[308px] items-center justify-center space-x-12 rounded-lg bg-white text-black border-1px-solid-gray-30 xl:w-[354px]"
        >
          <div className="font-bold">새로운 컬럼 추가하기</div>
          <Image
            src="/images/icon/ic-color-add.svg"
            width={22}
            height={22}
            alt="새로운 컬럼 생성 버튼"
          />
        </button>
        {openCreateColumnModal && (
          <NewColumnModal
            dashboardId={dashboardId}
            closeModal={closeModal}
            handleAddColumn={handleAddColumn}
          />
        )}
      </div>
    </>
  );
};

export default ColumnList;
