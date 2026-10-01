interface IPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination = () => {
  return <div>Pagination</div>;
};

export default Pagination;
