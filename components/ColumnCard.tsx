// import React, { useEffect, useState } from 'react';

// import TodoModal from './TodoModal';

// // Props 타입 정의
// interface ColumnCardProps {
//   cardId: string; // cardId를 prop으로 받음
// }

// const ColumnCard: React.FC<ColumnCardProps> = ({ cardId }) => {
//   const [card, setCard] = useState({
//     id: '',
//     title: '',
//     description: '',
//     tags: [],
//   });
//   // 모달을 기본적으로 열린 상태로 설정
//   const [isModalOpen, setIsModalOpen] = useState(true);

//   useEffect(() => {
//     const fetchCard = async () => {
//       try {
//         const response = await fetch(`/api/getCard?id=${cardId}`);
//         if (!response.ok) {
//           throw new Error('Card data fetch failed');
//         }
//         const data = await response.json();
//         setCard(data);
//       } catch (error) {
//         console.error('Failed to fetch card:', error);
//       }
//     };

//     fetchCard();
//   }, [cardId]);

//   return (
//     <div className="card-container">
//       {/* 카드 내용 대신 TodoModal을 직접 표시 */}
//       <TodoModal isOpen={isModalOpen} onClose={() => {}} card={card} />
//     </div>
//   );
// };

// export default ColumnCard;
