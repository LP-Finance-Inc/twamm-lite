import React, { HTMLAttributes, useMemo } from "react";

interface SettingButtonProps {
  idx: number;
  itemsCount: number;
  className?: HTMLAttributes<HTMLButtonElement>["className"];
  onClick(): void;
  highlighted: boolean;
  roundBorder?: "left" | "right" | undefined;
  children: React.ReactNode;
}

const SettingButton = ({
  idx,
  itemsCount,
  className = "",
  onClick,
  highlighted,
  roundBorder,
  children,
}: SettingButtonProps) => {
  const classes = `relative flex-1 py-4 px-1 text-white/50 bg-[#1B1B1E]`;
  const roundBorderClass = (() => {
    if (roundBorder === "left") return "v2-border-gradient-left";
    if (roundBorder === "right") return "v2-border-gradient-right";
    return null;
  })();

  const borderClassName = useMemo(() => {
    if (idx > 0 && idx < itemsCount) {
      return "border-l border-white/5";
    }
    return null;
  }, [idx, itemsCount]);

  return (
    <button
      type="button"
      className={`${
        highlighted
          ? `v2-border-gradient ${roundBorderClass} bg-v2-gradient bg-transparent`
          : ""
      } ${borderClassName} ${classes} ${className} relative`}
      onClick={onClick}
    >
      <div className="h-full w-full leading-none flex justify-center items-center">
        {children}
      </div>
    </button>
  );
};

export default SettingButton;
