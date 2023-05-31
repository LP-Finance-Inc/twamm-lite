import type { ReactNode } from "react";
import { useCallback } from "react";

import LeftArrowIcon from "../icons/left-arrow-icon";

export interface Props {
  children: ReactNode;
  onClose?: () => void;
  setOpen: (arg0: boolean) => void;
  title?: string;
}

export default ({ children, onClose, setOpen, title }: Props) => {
  const handleClose = useCallback(() => {
    setOpen(false);
    if (onClose) onClose();
  }, [onClose, setOpen]);

  return (
    <div className="absolute h-full w-full bg-twamm-bg rounded-lg overflow-hidden z-50">
      <div className="flex flex-col h-full w-full py-4 px-2">
        <div className="flex w-full justify-between">
          <div
            className="text-white fill-current w-6 h-6 cursor-pointer"
            onClick={handleClose}
          >
            <LeftArrowIcon width={24} height={24} />
          </div>

          {title && <div className="text-white">{title}</div>}

          <div className=" w-6 h-6" />
        </div>
        {children}
      </div>
    </div>
  );
};
