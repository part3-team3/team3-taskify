import Image from 'next/image';

const ColumnCard = ({
  imageUrl = '/images/icon/younghoontest.png',
  title = '새로운 일정 관리 Taskify',
  tags = ['일반', '백엔드'],
  dueDate = '2022.12.31',
  profileImageUrl = '/images/icon/younghoon.svg',
}: {
  imageUrl: string;
  title: string;
  tags: string[];
  dueDate: string;
  profileImageUrl: string;
}) => {
  return (
    <div className="flex h-auto w-284 flex-col rounded-6 p-12 border-1px-solid-gray-30 md:h-93 md:w-544 md:flex-row md:p-20 xl:h-auto xl:w-314 xl:flex-col">
      <div className="relative mb-10 mr-20 h-152 w-260 md:h-53 md:w-91 xl:h-160 xl:w-274">
        <Image src={imageUrl} fill alt="카드 이미지" />
      </div>
      <div className="flex-col gap-6 md:flex md:grow md:justify-between xl:grow-0 xl:gap-10">
        <div className="text-14 font-medium leading-[17px] text-black-20">
          {title}
        </div>

        <div className="flex items-end justify-between">
          <div className="md:flex xl:flex-col">
            <div className="mt-6 flex gap-6">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="h-max w-max rounded-4 bg-green10 px-6 py-4 text-10 leading-[12px] text-green20"
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between md:ml-16 xl:ml-0 xl:mt-10">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14">
                  <Image
                    src="images/icon/ic-calendar-gray.svg"
                    fill
                    alt="캘린더 아이콘"
                  />
                </div>
                <div className="text-10 font-medium leading-[12px] text-gray-40">
                  {dueDate}
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-22 w-22">
            <Image src={profileImageUrl} alt="프로필 이미지" fill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnCard;
