import type { MouseEvent } from "react";

import TokenIcon from "src/icons/token-icon";
import ChevronDownIcon from "src/icons/chevron-down-icon";

export default ({
  alt,
  disabled = false,
  image,
  label,
  onClick,
}: {
  alt?: string;
  disabled?: boolean;
  image?: string;
  label?: string;
  onClick: (e: MouseEvent) => void;
}) => {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    onClick(e);
  };

  return (
    <button
      type="button"
      className="py-2 px-3 rounded-2xl flex items-center bg-[#36373E] hover:bg-white/20 text-white"
      onClick={disabled ? () => null : handleClick}
      disabled={disabled}
    >
      <div className="h-5 w-5">
        <TokenIcon alt={alt} src={image} width={24} height={24} />
      </div>
      <div className="ml-4 mr-2 font-semibold" translate="no">
        {label ?? "-"}
      </div>
      <span className="text-white/25 fill-current">
        <ChevronDownIcon />
      </span>
    </button>
  );
};
