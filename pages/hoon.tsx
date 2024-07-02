import CardModal from '@/components/TodoCardModal/CardModal';
import TodoCreateModal from '@/components/TodoModalForm/TodoCreateModal';
import React from 'react';

const hoon = () => {
  return (
    <div>
      <CardModal />
      <TodoCreateModal />
    </div>
  );
};

export default hoon;
