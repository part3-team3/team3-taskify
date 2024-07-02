import { privateApi } from '@/lib/axios';
import { TodoCreateFormData } from '@/types/ModalFormData';

const postCreateCard = async (createFormData: TodoCreateFormData) => {
  const res = await privateApi.post('cards', createFormData);
  return res.data;
};

export default postCreateCard;
