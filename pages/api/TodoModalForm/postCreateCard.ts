import axios from '@/lib/axios';
import { TodoFormData } from '@/types/ModalFormData';

const postCreateCard = async (createFormData: TodoFormData) => {
  const res = await axios.post('cards', createFormData);
  return res.data;
};

export default postCreateCard;
