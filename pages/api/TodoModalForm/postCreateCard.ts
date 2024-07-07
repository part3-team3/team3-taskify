import axios from '@/lib/axios';
import { TodoFormData } from '@/types/ModalFormData';

const postCreateCard = async (createFormData: TodoFormData) => {
  try {
    const res = await axios.post('cards', createFormData);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default postCreateCard;
