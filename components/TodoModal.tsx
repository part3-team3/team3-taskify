import axios from '@/lib/axios';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';

import Modal from './Modal';

interface CardServiceResponseDto {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

interface CommentList {
  cursorId: number;
  comments: Comment[];
}

const TodoModal = () => {
  const [card, setCard] = useState<CardServiceResponseDto>();
  const [commentList, setCommentList] = useState<CommentList>();
  const [kebabButtonVisible, setKebabButtonVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const getTodoCard = async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk3NiwidGVhbUlkIjoiNi0zIiwiaWF0IjoxNzE5MjAwODQzLCJpc3MiOiJzcC10YXNraWZ5In0.ybVvT21thF6vjcG5ReI_XlIHCSn45HoFt6FTWKYYAm8';
      try {
        const res = await axios.get('cards/8667', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const commentsRes = await axios.get('comments?size=1&cardId=8667', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data: CardServiceResponseDto = res.data;
        const commentsData: CommentList = commentsRes.data;
        setCard(data);
        setCommentList(commentsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    getTodoCard();
  }, []);

  const handleMenuOpen = () => {
    setKebabButtonVisible(!kebabButtonVisible);
  };

  const handleEditButton = () => {};

  const handleDeleteButton = () => {};

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="px-28 py-32">
      <button
        onClick={openModal}
        className="text-black bg-blue-500 hover:bg-blue-700 mb-4 rounded px-4 py-2 font-semibold"
      >
        테스트 모달 열기
      </button>
      <Modal
        width="730px"
        height="763px"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {card && (
          <div className="flex gap-24">
            <div className="flex flex-col">
              <div className="text-24 font-bold text-black-20">
                {card.title}
              </div>
              <div>
                {card.tags.map((tag) => (
                  <div key={tag} className="h-max w-max px-6 py-4">
                    {tag}
                  </div>
                ))}
              </div>
              <div className="text-14 font-normal leading-[24px]">
                {card.description}
              </div>
              <div className="relative my-16 h-[263px] w-[450px]">
                <Image
                  className="rounded-6 object-cover"
                  src={card.imageUrl}
                  alt="카드 이미지"
                  fill
                />
              </div>
              <form
                onSubmit={handleSubmit}
                className="relative flex flex-col gap-10"
              >
                <div className="text-16 font-medium leading-[19px] text-black-20">
                  댓글
                </div>
                <div>
                  <textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="댓글 작성하기"
                    className="w-450 h-110 resize-none rounded-6 border border-solid border-gray-30 p-16 placeholder:text-14"
                  />
                </div>
                <button className="btn_desktop_white absolute bottom-16 left-[353px]">
                  입력
                </button>
              </form>

              {commentList &&
                commentList.comments.map((comment) => (
                  <div className="flex flex-col" key={comment.id}>
                    <div className="mt-20 flex gap-10">
                      <div className="flex justify-start">
                        <Image
                          width={34}
                          height={34}
                          src={'/images/icon/younghoon.svg'}
                          alt="담당자 프로필 이미지"
                        />
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-14 font-semibold leading-[17px] text-black-20">
                          {comment.author.nickname}
                        </div>
                        <div className="text-12 font-normal leading-[14px] text-gray-40">
                          {formatDate(comment.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="ml-44 flex flex-col gap-12">
                      <div className="text-14 font-normal leading-[17px] text-black-20">
                        {comment.content}
                      </div>
                      <div className="flex gap-12 text-12 leading-[14px] text-gray-40 underline">
                        <div>수정</div>
                        <div>삭제</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-col gap-21">
              <div className="relative flex justify-end gap-24">
                <Image
                  onClick={handleMenuOpen}
                  src="/images/icon/ic-kebab.svg"
                  width={28}
                  height={28}
                  alt="케밥아이콘"
                />
                {kebabButtonVisible ? (
                  <div className="absolute right-63 top-32 h-82 w-93 rounded-6 border border-solid border-gray-30 bg-white">
                    <div
                      onClick={handleEditButton}
                      className="flex-center m-6 h-32 w-81 cursor-pointer text-14 font-normal leading-[24px] hover:rounded-4 hover:bg-violet-10 hover:text-violet-20"
                    >
                      수정하기
                    </div>
                    <div
                      onClick={handleDeleteButton}
                      className="flex-center m-6 h-32 w-81 cursor-pointer text-14 font-normal leading-[24px] hover:rounded-4 hover:bg-violet-10 hover:text-violet-20"
                    >
                      삭제하기
                    </div>
                  </div>
                ) : (
                  ''
                )}
                <Image
                  src="/images/icon/ic-x.svg"
                  width={32}
                  height={32}
                  alt="x아이콘"
                />
              </div>
              <div className="flex h-155 w-200 flex-col gap-20 rounded-8 border border-solid border-gray-30 p-16">
                <div className="flex flex-col gap-6">
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
                <div className="flex flex-col gap-6">
                  <div className="text-12 font-semibold leading-[20px]">
                    마감일
                  </div>
                  <div className="text-14 font-normal leading-[17px] text-black-20">
                    {card.dueDate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TodoModal;
