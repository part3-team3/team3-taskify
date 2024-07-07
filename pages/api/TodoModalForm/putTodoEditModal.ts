import axios from '@/lib/axios';
import { TodoFormData } from '@/types/ModalFormData';

const putTodoEditModal = async (body: TodoFormData, cardId?: number) => {
  if (!cardId) return;
  const res = await axios.put(`/cards/${cardId}`, body);

  return res.data;
};

export default putTodoEditModal;
