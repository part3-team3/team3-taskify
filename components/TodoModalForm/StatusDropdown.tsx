import getColumns from '@/pages/api/TodoModalForm/getColumns';
import { TodoFormData } from '@/types/ModalFormData';
import Column from '@/types/column';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const Option = ({
  column,
  isSelected,
  handleSelectOption,
}: {
  column: Column;
  isSelected?: boolean;
  handleSelectOption?: (column: Column) => void;
}) => {
  const handleOptionClick = () => {
    handleSelectOption?.(column);
  };
  const addLeftMargin = isSelected === false;

  return (
    <div className="flex gap-6" onClick={handleOptionClick}>
      {isSelected && (
        <Image
          width={22}
          height={22}
          src="/images/icon/ic-dropdown-check.svg"
          alt="드롭다운 체크 아이콘"
        />
      )}
      <div
        className={`flex h-max w-max gap-6 rounded-11 bg-violet-10 px-8 py-4 text-12 leading-[14px] text-violet-20 ${addLeftMargin ? 'ml-28' : ''}`}
      >
        <Image
          width={6}
          height={6}
          src="/images/icon/ic-dot-purple.svg"
          alt="상태 드롭다운 색상 아이콘"
        />
        <div>{column.title}</div>
      </div>
    </div>
  );
};

const StatusDropdown = ({
  label,
  columnId,
  dashboardId,
  setFormData,
}: {
  label: string;
  columnId: number;
  dashboardId: number;
  setFormData: Dispatch<SetStateAction<TodoFormData>>;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [columnsData, setColumnsData] = useState<Column[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<Column>();

  useEffect(() => {
    const loadColumns = async () => {
      const columns: Column[] = await getColumns(dashboardId);
      const currentColumn = columns.find((column) => column.id === columnId);

      setColumnsData(columns);
      setSelectedColumn(currentColumn);
    };
    loadColumns();
  }, []);

  const handleDropdownVisible = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectOption = (column: Column) => {
    setSelectedColumn(column);
    setFormData((prev: TodoFormData) => ({ ...prev, columnId: column.id }));
  };

  return (
    <div>
      <div className="flex flex-col gap-10">
        <div className="text-16 font-medium leading-[19px] md:text-18 md:leading-[21px]">
          {label}
        </div>
        <div>
          <div
            onClick={handleDropdownVisible}
            className="relative flex h-42 w-287 items-center rounded-6 px-16 py-13 text-14 leading-[17px] text-gray-40 border-1px-solid-gray-30 md:h-48 md:w-217"
          >
            {selectedColumn ? (
              <Option column={selectedColumn} />
            ) : (
              '상태를 선택해 주세요'
            )}
          </div>
          <div className="relative">
            <Image
              className="absolute bottom-8 right-8 md:bottom-10"
              src="/images/icon/ic-arrow-dropdown.svg"
              width={26}
              height={26}
              alt="드롭다운화살표"
            />
          </div>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="absolute z-10 flex flex-col px-8 mt-2 bg-white h-max w-287 gap-13 rounded-6 py-13 border-1px-solid-gray-30 md:w-217">
          {columnsData?.map((column) => (
            <Option
              key={column.id}
              column={column}
              isSelected={column.id === selectedColumn?.id}
              handleSelectOption={handleSelectOption}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
