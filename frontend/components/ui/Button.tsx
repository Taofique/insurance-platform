import type { ReactNode } from "react";
import { Link } from "react-router";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  icon,
  iconPosition = "right",
  type = "button",
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-poppins capitalize transition-all duration-200 rounded-[5px] border font-medium";

  // Variant styles
  const variants = {
    primary:
      "bg-[#ac3e25] text-white border-[#ac3e25] hover:bg-[#9a3620] hover:border-[#9a3620] active:bg-[#8a2f1a]",
    secondary:
      "bg-white text-[#ac3e25] border-[#ac3e25] hover:bg-gray-50 active:bg-gray-100",
    outline:
      "bg-transparent text-[#ac3e25] border-[#ac3e25] hover:bg-[#ac3e25]/5 active:bg-[#ac3e25]/10",
    ghost:
      "bg-transparent text-[#ac3e25] border-transparent hover:bg-[#ac3e25]/5 active:bg-[#ac3e25]/10",
  };

  // Size styles
  const sizes = {
    sm: "px-3 py-1.5 text-xs lg:px-4 lg:py-2 lg:text-sm",
    md: "px-4 py-2 text-sm lg:px-6 lg:py-2.5 lg:text-base",
    lg: "px-6 py-3 text-base lg:px-[35px] lg:py-[14px] lg:text-lg",
  };

  const classes = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${className}
  `;

  // If href is provided, render as Link
  if (href) {
    return (
      <Link to={href} className={classes}>
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  );
}
