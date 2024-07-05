import axios from '@/lib/axios';

const deleteCard = async (cardId: number) => {
  await axios.delete(`/cards/${cardId}`);
};

export default deleteCard;
