import { privateApi } from '@/lib/axios';
import FormData from '@/types/EditModalFormData';

export const putTodoEditModal = async (body: FormData) => {
  const res = await privateApi.put('/cards/8736', body);

  return res.data;
};

export default putTodoEditModal;
