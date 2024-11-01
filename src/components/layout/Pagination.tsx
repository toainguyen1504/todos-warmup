import React from "react";
import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  //init state  pagination

  const renderPaginationButtons = () => {
    const buttons = [];
    const totalDisplay = 10; // Total buttons to display

    // Logic for pagination buttons
    if (totalPages <= totalDisplay) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`w-12 px-2 py-2 rounded ${
              currentPage === i
                ? "bg-primary-color text-white"
                : " text-text-color hover:bg-hover-color"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Create pagination based on the current page
      if (currentPage < 4) {
        // Show first pages
        for (let i = 1; i <= 6; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`w-12 px-2 py-2 rounded ${
                currentPage === i
                  ? "bg-primary-color text-white"
                  : " text-text-color hover:bg-hover-color"
              }`}
            >
              {i}
            </button>
          );
        }
        buttons.push(<span key="dot">...</span>);
        buttons.push(
          <button
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            className={`w-12 px-2 py-2 rounded ${
              currentPage === totalPages
                ? "bg-primary-color text-white"
                : " text-text-color hover:bg-hover-color"
            }`}
          >
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 3) {
        // Show last pages
        buttons.push(
          <button
            key={1}
            onClick={() => onPageChange(1)}
            className={`w-12 px-2 py-2 rounded ${
              currentPage === 1
                ? "bg-primary-color text-white"
                : " text-text-color hover:bg-hover-color"
            }`}
          >
            {1}
          </button>
        );
        buttons.push(<span key="dot">...</span>);
        for (let i = totalPages - 5; i <= totalPages; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`w-12 px-2 py-2 rounded ${
                currentPage === i
                  ? "bg-primary-color text-white"
                  : " text-text-color hover:bg-hover-color"
              }`}
            >
              {i}
            </button>
          );
        }
      } else {
        // Show middle pages with dots
        buttons.push(
          <button
            key={1}
            onClick={() => onPageChange(1)}
            className={` w-12 px-2 py-2 rounded ${
              currentPage === 1
                ? "bg-primary-color text-white"
                : " text-text-color hover:bg-hover-color"
            }`}
          >
            {1}
          </button>
        );
        buttons.push(<span key="dot1">...</span>);

        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          if (i > 0 && i <= totalPages) {
            buttons.push(
              <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`w-12 px-2 py-2 rounded ${
                  currentPage === i
                    ? "bg-primary-color text-white"
                    : " text-text-color hover:bg-hover-color"
                }`}
              >
                {i}
              </button>
            );
          }
        }

        buttons.push(<span key="dot2">...</span>);
        buttons.push(
          <button
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            className={`w-12 px-2 py-2 rounded ${
              currentPage === totalPages
                ? "bg-primary-color text-white"
                : " text-text-color hover:bg-hover-color"
            }`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  return (
    <>
      {/* UI pagination */}
      <div className="flex items-center justify-center mt-4 mb-16">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-secondary-color rounded hover:text-secondary-light-color disabled:opacity-50"
        >
          <FaCaretSquareLeft size={28} />
        </button>

        {renderPaginationButtons()}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-1 text-secondary-color rounded hover:text-secondary-light-color disabled:opacity-50"
        >
          <FaCaretSquareRight size={28} />
        </button>
      </div>
    </>
  );
};

export default Pagination;
