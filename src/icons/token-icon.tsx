import Image from "next/image";

import QuestionMark from "src/icons/question-mark";
import CancelIcon from "src/icons/cancel-icon";

export interface TokenIconProps {
  alt?: string;
  src?: string;
  width?: number;
  height?: number;
  disabled?: boolean;
}

const TokenIcon = ({ alt, src, width, height, disabled }: TokenIconProps) => (
  <div
    className="relative text-xs flex items-center justify-center  rounded-full overflow-hidden"
    style={{ width, height }}
  >
    {src && alt ? (
      <Image src={src} alt={alt} fill style={{ objectFit: "contain" }} />
    ) : (
      <>
        {disabled && <CancelIcon />}
        {!disabled && <QuestionMark />}
      </>
    )}
  </div>
);

export default TokenIcon;
