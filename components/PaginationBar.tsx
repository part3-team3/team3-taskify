interface PaginationBarProps {
  totalPage: number;
  activePage: number;
  onPageChange: (pageNumber: number) => void;
}
const PaginationBar: React.FC<PaginationBarProps> = ({
  totalPage,
  activePage,
  onPageChange,
}) => {
  return (
    <>
      <button
        disabled={activePage === 1}
        onClick={() => onPageChange(activePage - 1)}
      >왼쪽</button>
      <button
        disabled={activePage === totalPage}
        onClick={() => onPageChange(activePage + 1)}
      >오른쪽</button>
    </>
  );
};
export default PaginationBar;
