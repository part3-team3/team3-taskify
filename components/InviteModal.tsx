// import {useState} from 'react';
// import Modal from '@/components/Modal';

// const ModalTest: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return(
//     <div className='flex min-h-screen flex-col items-center justify-center py-2'>
//       <button onClick={openModal}
//     </div>
//   )
// }

// import Modal from '@/components/Modal';
// import axios from '@/lib/axios';
// import { useEffect, useState } from 'react';

// interface InviteModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   // dashboardId: string;
// }

// const InviteModal = ({
//   isOpen,
//   onClose,
//   // dashboardId,
// }: InviteModalProps) => {
//   const [email, setEmail] = useState('');
//   const [emailValid, setEmailValid] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   // const [isModalOpen, setIsModalOpen] = useState(false);
//   // const [inputValue, setInputValue] = useState('');

//   // const openModal = () => setIsModalOpen(true);
//   // const closeModal = () => setIsModalOpen(false);

//   useEffect(() => {
//     if (isOpen) {
//       setEmail('');
//       setEmailValid(false);
//       setError(null);
//     }
//   }, [isOpen]);

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setEmail(value);
//     setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const memberResponse = await axios.get('members');
//       const members = memberResponse.data;

//       const user = members.find((member: any) => member.email === email);
//       if (!user) {
//         setError('입력한 이메일을 가진 사용자가 없습니다.');
//         setLoading(false);
//         return;
//       }

//       await axios.post(`dashboards/9765/invitation`, { email });

//       alert('초대가 성공적으로 전송되었습니다');
//       onClose();
//     } catch (error) {
//       setError('초대 중 오류 발생');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }

//     if (!isOpen) return null;

//     return (
//       <div>
//         <Modal width="730px" height="763px" isOpen={isOpen} onClose={onClose}>
//           <div>초대하기</div>
//           <div className="text-18 font-semibold">이메일</div>
//           <input
//             type="text"
//             placeholder="이메일을 입력해주세요"
//             value={email}
//             onChange={handleEmailChange}
//           />
//           <button onClick={handleSubmit} disabled={!emailValid || loading}>
//             초대하기
//           </button>
//           {error && <div className="error">{error}</div>}
//         </Modal>
//       </div>
//     );
//   };
// };

// export default InviteModal;
