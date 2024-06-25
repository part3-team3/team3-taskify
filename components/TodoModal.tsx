import useMediaQuery from '@/hooks/useMediaQuery';
import { getCard } from '@/pages/api/getCard';
import { Card } from '@/types/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Comments from './Comments';
import Modal from './Modal';

const TodoModal = () => {
  const [card, setCard] = useState<Card>();
  const [kebabButtonVisible, setKebabButtonVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  let modalWidth = '327px';
  let modalHeight = '708px';

  if (isTablet) {
    modalWidth = '680px';
    modalHeight = '770px';
  } else if (isDesktop) {
    modalWidth = '730px';
    modalHeight = '763px';
  }

  useEffect(() => {
    const getTodoCard = async () => {
      const cardData: Card = await getCard();
      setCard(cardData);
    };
    getTodoCard();
  }, []);

  const handleMenuOpen = () => {
    setKebabButtonVisible(!kebabButtonVisible);
  };

  const handleEditButton = () => {};
  const handleDeleteButton = () => {};

  return (
    <div className="px-20 py-40 md:px-28 md:py-32">
      <button
        onClick={openModal}
        className="px-4 py-2 mb-4 font-semibold text-black bg-blue-500 rounded hover:bg-blue-700"
      >
        테스트 모달 열기
      </button>
      <Modal
        width={modalWidth}
        height={modalHeight}
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {card && (
          <div className="pt-12 md:flex md:gap-24">
            <div className="md:flex md:flex-col">
              <div className="flex justify-between text-20 font-bold leading-[24px] text-black-20 md:text-24 md:leading-[29px]">
                {card.title}
                {isMobile && (
                  <div className="relative flex gap-16 bottom-24">
                    <Image
                      onClick={handleMenuOpen}
                      src="/images/icon/ic-kebab.svg"
                      width={20}
                      height={20}
                      alt="케밥아이콘"
                    />
                    <Image
                      src="/images/icon/ic-x.svg"
                      width={24}
                      height={24}
                      alt="x아이콘"
                    />
                  </div>
                )}
              </div>
              {isMobile && (
                <div className="flex flex-col h-64 gap-4 pt-12 pb-10 pl-16 mt-16 border border-solid w-287 rounded-8 border-gray-30 pr-50">
                  <div className="flex gap-90">
                    <div className="text-10 font-semibold leading-[12px]">
                      담당자
                    </div>
                    <div className="text-10 font-semibold leading-[12px]">
                      마감일
                    </div>
                  </div>
                  <div className="flex items-center gap-62">
                    <div className="flex items-center gap-8">
                      <Image
                        width={26}
                        height={26}
                        src={'/images/icon/younghoon.svg'}
                        alt="담당자 프로필 이미지"
                      />
                      <div className="text-12 font-normal leading-[14px] text-black-20">
                        {card.assignee.nickname}
                      </div>
                    </div>
                    <div className="text-12 font-normal leading-[14px] text-black-20">
                      {card.dueDate}
                    </div>
                  </div>
                </div>
              )}
              <div className="py-16">
                {card.tags.map((tag) => (
                  <div
                    key={tag}
                    className="h-max w-max rounded-4 bg-violet-10 px-6 py-4 text-10 leading-[12px] text-violet-20"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <div className="text-12 font-normal leading-[22px] md:text-14 md:leading-[24px]">
                {card.description}
              </div>
              <div className="relative mb-19 mt-16 h-168 w-287 md:h-[245px] md:w-[420px] xl:h-[263px] xl:w-[450px]">
                <Image
                  className="object-cover rounded-6"
                  src={card.imageUrl}
                  alt="카드 이미지"
                  fill
                />
              </div>
              <Comments />
            </div>
            <div className="md:flex md:flex-col md:gap-21">
              <div className="relative flex justify-end gap-24">
                {!isMobile && (
                  <Image
                    onClick={handleMenuOpen}
                    src="/images/icon/ic-kebab.svg"
                    width={28}
                    height={28}
                    alt="케밥아이콘"
                  />
                )}
                {kebabButtonVisible ? (
                  <div className="absolute bg-white border border-solid right-63 top-32 h-82 w-93 rounded-6 border-gray-30">
                    <div
                      onClick={handleEditButton}
                      className="m-6 h-32 w-81 cursor-pointer text-14 font-normal leading-[24px] flex-center hover:rounded-4 hover:bg-violet-10 hover:text-violet-20"
                    >
                      수정하기
                    </div>
                    <div
                      onClick={handleDeleteButton}
                      className="m-6 h-32 w-81 cursor-pointer text-14 font-normal leading-[24px] flex-center hover:rounded-4 hover:bg-violet-10 hover:text-violet-20"
                    >
                      삭제하기
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {!isMobile && (
                  <Image
                    src="/images/icon/ic-x.svg"
                    width={32}
                    height={32}
                    alt="x아이콘"
                  />
                )}
              </div>
              {(isTablet || isDesktop) && (
                <div className="md:flex md:h-155 md:w-180 md:flex-col md:gap-20 md:rounded-8 md:border md:border-solid md:border-gray-30 md:p-16 xl:w-200">
                  <div className="md:flex md:flex-col md:gap-6">
                    <div className="text-12 font-semibold leading-[20px]">
                      담당자
                    </div>
                    <div className="flex items-center gap-8">
                      <Image
                        width={34}
                        height={34}
                        src={'/images/icon/younghoon.svg'}
                        alt="담당자 프로필 이미지"
                      />
                      <div className="text-14 font-normal leading-[17px] text-black-20">
                        {card.assignee.nickname}
                      </div>
                    </div>
                  </div>
                  <div className="md:flex md:flex-col md:gap-6">
                    <div className="text-12 font-semibold leading-[20px]">
                      마감일
                    </div>
                    <div className="text-14 font-normal leading-[17px] text-black-20">
                      {card.dueDate}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default TodoModal;

//   return (
//     <div className="py-32 px-28">
//       <button
//         onClick={openModal}
//         className="px-4 py-2 mb-4 font-semibold text-black bg-blue-500 rounded hover:bg-blue-700"
//       >
//         테스트 모달 열기
//       </button>
//       <Modal
//         width="730px"
//         height="763px"
//         isOpen={isModalOpen}
//         onClose={closeModal}
//       >
//         {card && (
//           <div className="flex gap-24">
//             <div className="flex flex-col">
//               <div className="font-bold text-24 text-black-20">
//                 {card.title}
//               </div>
//               <div>
//                 {card.tags.map((tag) => (
//                   <div key={tag} className="px-6 py-4 h-max w-max">
//                     {tag}
//                   </div>
//                 ))}
//               </div>
//               <div className="text-14 font-normal leading-[24px]">
//                 {card.description}
//               </div>
//               <div className="relative my-16 h-[263px] w-[450px]">
//                 <Image
//                   className="object-cover rounded-6"
//                   src={card.imageUrl}
//                   alt="카드 이미지"
//                   fill
//                 />
//               </div>
//               <Comments />
//             </div>
//             <div className="flex flex-col gap-21">
//               <div className="relative flex justify-end gap-24">
//                 <Image
//                   onClick={handleMenuOpen}
//                   src="/images/icon/ic-kebab.svg"
//                   width={28}
//                   height={28}
//                   alt="케밥아이콘"
//                 />
//                 {kebabButtonVisible ? (
//                   <div className="absolute bg-white border border-solid right-63 top-32 h-82 w-93 rounded-6 border-gray-30">
//                     <div
//                       onClick={handleEditButton}
//                       className="m-6 h-32 w-81 cursor-pointer text-14 font-normal leading-[24px] flex-center hover:rounded-4 hover:bg-violet-10 hover:text-violet-20"
//                     >
//                       수정하기
//                     </div>
//                     <div
//                       onClick={handleDeleteButton}
//                       className="m-6 h-32 w-81 cursor-pointer text-14 font-normal leading-[24px] flex-center hover:rounded-4 hover:bg-violet-10 hover:text-violet-20"
//                     >
//                       삭제하기
//                     </div>
//                   </div>
//                 ) : (
//                   ''
//                 )}
//                 <Image
//                   src="/images/icon/ic-x.svg"
//                   width={32}
//                   height={32}
//                   alt="x아이콘"
//                 />
//               </div>
//               <div className="flex flex-col gap-20 p-16 border border-solid h-155 w-200 rounded-8 border-gray-30">
//                 <div className="flex flex-col gap-6">
//                   <div className="text-12 font-semibold leading-[20px]">
//                     담당자
//                   </div>
//                   <div className="flex items-center gap-8">
//                     <Image
//                       width={34}
//                       height={34}
//                       src={'/images/icon/younghoon.svg'}
//                       alt="담당자 프로필 이미지"
//                     />
//                     <div className="text-14 font-normal leading-[17px] text-black-20">
//                       {card.assignee.nickname}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-6">
//                   <div className="text-12 font-semibold leading-[20px]">
//                     마감일
//                   </div>
//                   <div className="text-14 font-normal leading-[17px] text-black-20">
//                     {card.dueDate}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };
