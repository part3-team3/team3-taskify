import axios from '@/lib/axios';
import { TodoFormData } from '@/types/ModalFormData';

const putTodoEditModal = async (body: TodoFormData) => {
  const res = await axios.put('/cards/8736', body);

  return res.data;
};

export default putTodoEditModal;
