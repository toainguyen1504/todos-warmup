import React from "react";
import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";

import ButtonNavigation from "../ui/ButtonNavigation";

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
  //  Render buttons
  const renderButtons = () => {
    const buttons = [];
    const totalDisplay = 10; // Total buttons to display

    // Logic for pagination buttons
    if (totalPages <= totalDisplay) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <ButtonNavigation
            key={i}
            onClick={() => onPageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </ButtonNavigation>
        );
      }
    } else {
      // Create pagination based on the current page
      if (currentPage < 4) {
        // Show first pages
        for (let i = 1; i <= 6; i++) {
          buttons.push(
            <ButtonNavigation
              key={i}
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </ButtonNavigation>
          );
        }

        buttons.push(<span key="dot">...</span>);
        buttons.push(
          <ButtonNavigation
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </ButtonNavigation>
        );
      } else if (currentPage >= totalPages - 3) {
        // Show last pages
        buttons.push(
          <ButtonNavigation
            key={1}
            onClick={() => onPageChange(1)}
            isActive={currentPage === 1}
          >
            {1}
          </ButtonNavigation>
        );
        buttons.push(<span key="dot">...</span>);
        for (let i = totalPages - 5; i <= totalPages; i++) {
          buttons.push(
            <ButtonNavigation
              key={i}
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </ButtonNavigation>
          );
        }
      } else {
        // Show middle pages with dots
        buttons.push(
          <ButtonNavigation
            key={1}
            onClick={() => onPageChange(1)}
            isActive={currentPage === 1}
          >
            {1}
          </ButtonNavigation>
        );
        buttons.push(<span key="dot1">...</span>);

        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          if (i > 0 && i <= totalPages) {
            buttons.push(
              <ButtonNavigation
                key={i}
                onClick={() => onPageChange(i)}
                isActive={currentPage === i}
              >
                {i}
              </ButtonNavigation>
            );
          }
        }

        buttons.push(<span key="dot2">...</span>);
        buttons.push(
          <ButtonNavigation
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </ButtonNavigation>
        );
      }
    }

    return buttons;
  };

  return (
    <>
      {/* UI pagination */}
      <div className="flex items-center justify-center mt-4 mb-16">
        <ButtonNavigation
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          extraClasses="hover:bg-transparent hover:text-secondary-light-color"
        >
          <FaCaretSquareLeft size={32} />
        </ButtonNavigation>

        {renderButtons()}

        <ButtonNavigation
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          extraClasses="hover:bg-transparent hover:text-secondary-light-color "
        >
          <FaCaretSquareRight size={32} />
        </ButtonNavigation>
      </div>
    </>
  );
};

export default Pagination;
