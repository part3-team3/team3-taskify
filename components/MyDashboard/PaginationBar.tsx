import Image from 'next/image';


interface PaginationBarProps {
  totalPage: number;
  activePage: number;
  onPageChange: (pageNumber: number) => void;
}
const PaginationBar: React.FC<PaginationBarProps> = ({
  totalPage,
  activePage,
  onPageChange,
}: PaginationBarProps) => {
  return (
    <>
      <div className="flex">
        <button
          className="flex h-36 w-36 items-center justify-center rounded-l border border-solid border-gray-30 bg-white"
          disabled={activePage === 1}
          onClick={() => onPageChange(activePage - 1)}
        >
          <div className="relative h-16 w-16">
            {activePage === 1 ? (
              <Image
                fill
                src="/images/icon/ic-off-arrow-left.svg"
                alt="이전 목록"
              />
            ) : (
              <Image
                fill
                src="/images/icon/ic-on-arrow-left.svg"
                alt="이전 목록 없음"
              />
            )}
          </div>
        </button>
        <button
          className="flex h-36 w-36 items-center justify-center rounded-r border border-solid border-gray-30 bg-white"
          disabled={activePage === totalPage}
          onClick={() => onPageChange(activePage + 1)}
        >
          <div className="relative h-16 w-16">
            {activePage === totalPage ? (
              <Image
                fill
                src="/images/icon/ic-off-arrow-right.svg"
                alt="다음 목록"
              />
            ) : (
              <Image
                fill
                src="/images/icon/ic-on-arrow-right.svg"
                alt="다음 목록 없음"
              />
            )}
          </div>
        </button>
      </div>
    </>
  );
};
export default PaginationBar;