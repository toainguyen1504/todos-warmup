import React from "react";

interface ButtonNavigationProps {
  onClick: () => void;
  disabled?: boolean;
  extraClasses?: string;
  isActive?: boolean;
  children: React.ReactNode;
}

const ButtonNavigation: React.FC<ButtonNavigationProps> = ({
  onClick,
  disabled = false,
  extraClasses = "",
  isActive = false,
  children,
}) => {
  const activeClasses = isActive
    ? "bg-primary-color text-white"
    : "text-text-color hover:bg-hover-color";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${activeClasses} w-12 px-2 py-2 rounded ${extraClasses} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default ButtonNavigation;
