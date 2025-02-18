import React, { FunctionComponent } from "react";
// hooks
import usePagination from "@/hooks/usePagination";
// css
import "@/css/pagination.css";

interface PaginationProps {
  size: number;
  step: number;
  itemsPerPage: number;
  onClickHandler: (page: number | null) => void;
}

const PaginationComponent: FunctionComponent<PaginationProps> = ({
  size,
  step,
  itemsPerPage,
  onClickHandler,
}) => {
  
  const {
    currentPage,
    totalPages,
    paginationRange,
    pageHandler,
    nextPage,
    goToPreviousPage,
  } = usePagination({
    totalItems: size,
    itemsPerPage,
    stepCount: step,
    onClickHandler,
  });

  return (
    <div className="pagination-container">
      <div className="pagination">
        <button
          className="pagination__arrow"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          &larr;
        </button>

        {paginationRange.map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === "number" ? (
              <button
                key={index}
                className={`pagination__number ${
                  page === currentPage ? "pagination__number--active" : ""
                }`}
                onClick={() => pageHandler(page)}
              >
                {page}
              </button>
            ) : (
              <span className="pagination__dots">{page}</span>
            )}
          </React.Fragment>
        ))}

        <button
          className="pagination__arrow pagination__arrow--right"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
