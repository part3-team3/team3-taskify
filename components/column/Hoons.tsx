import CardModal from '@/components/TodoCardModal/CardModal';
import TodoCreateModal from '@/components/TodoModalForm/TodoCreateModal';
import { getCardList } from '@/pages/api/column/getCardList';
import { Card } from '@/types/card';
import { useEffect, useState } from 'react';

import ColumnCard from './ColumnCard';

const Hoons = () => {
  const [cards, setCards] = useState<Card[]>([]);
  console.log(cards);

  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards = await getCardList();
      setCards(fetchedCards.cards);
    };
    fetchCards();
  }, []);

  if (!cards) return null;

  return (
    <div>
      <CardModal />
      <TodoCreateModal />
      {cards.map((card) => (
        <ColumnCard card={card} key={card.id} />
      ))}
    </div>
  );
};

export default Hoons;
