import { useMemo, useState } from "react";
import { ITEM_PER_PAGE, STEP } from "../utils/constant";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  stepCount?: number; // Number of pages to show around the active page
  onClickHandler: (page: number | null) => void;
}

const usePagination = ({
  totalItems,
  itemsPerPage,
  stepCount = STEP,
  onClickHandler,
}: UsePaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const paginationRange = useMemo(() => {
    const totalPageNumbersToShow = stepCount * 2 + ITEM_PER_PAGE;
    if (totalPages <= totalPageNumbersToShow) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const startPage = Math.max(currentPage - stepCount, 2);
    const endPage = Math.min(currentPage + stepCount, totalPages - 1);
    const hasLeftDots = startPage > 2;
    const hasRightDots = endPage < totalPages - 1;

    const pages: (number | string)[] = [1];

    if (hasLeftDots) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (hasRightDots) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }, [currentPage, stepCount, totalPages]);

  const pageHandler = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      onClickHandler(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      onClickHandler(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      onClickHandler(currentPage - 1);
    }
  };

  return {
    currentPage,
    totalPages,
    paginationRange,
    pageHandler,
    nextPage,
    goToPreviousPage,
  };
};

export default usePagination;