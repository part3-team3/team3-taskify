import { getColumn } from '@/pages/api/column/getColumn';
import Column from '@/types/column';
import { useEffect, useState } from 'react';

const useColumnTitleDuplicateChecker = (
  dashboardId: number,
  titleToCheck: string,
) => {
  const [columns, setColumns] = useState<Column[]>();

  useEffect(() => {
    const fetchColumns = async () => {
      const data = await getColumn(dashboardId);
      setColumns(data.data);
    };
    fetchColumns();
  }, [dashboardId]);

  const isDuplicate = columns?.some(({ title }) => title === titleToCheck);
  // true or false
  return isDuplicate;
};

export default useColumnTitleDuplicateChecker;
