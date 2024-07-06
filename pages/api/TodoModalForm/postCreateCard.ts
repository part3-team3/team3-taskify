import axios from '@/lib/axios';
import { TodoCreateFormData } from '@/types/ModalFormData';

const postCreateCard = async (createFormData: TodoCreateFormData) => {
  const res = await axios.post('cards', createFormData);
  return res.data;
};

export default postCreateCard;
