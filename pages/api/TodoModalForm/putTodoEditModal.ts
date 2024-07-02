import { privateApi } from '@/lib/axios';
import { TodoFormData } from '@/types/ModalFormData';

const putTodoEditModal = async (body: TodoFormData) => {
  const res = await privateApi.put('/cards/8736', body);

  return res.data;
};

export default putTodoEditModal;
