"use client";

import ReactPaginate from "react-paginate";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface ISessionsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const paginationItemClass =
  "flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors";

const SessionsPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ISessionsPaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      previousLabel={<MdChevronLeft className="size-4" />}
      nextLabel={<MdChevronRight className="size-4" />}
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      containerClassName="flex items-center justify-center gap-3 py-10"
      pageLinkClassName={`${paginationItemClass} text-sm text-secondary hover:bg-raised hover:text-primary`}
      activeLinkClassName="bg-red! text-primary! hover:bg-red!"
      previousLinkClassName={`${paginationItemClass} bg-card hover:bg-raised`}
      nextLinkClassName={`${paginationItemClass} bg-card hover:bg-raised`}
      disabledLinkClassName="cursor-not-allowed opacity-40 hover:bg-card"
      breakLinkClassName="flex size-10 items-center justify-center text-secondary"
    />
  );
};

export default SessionsPagination;
