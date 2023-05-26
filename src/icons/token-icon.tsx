import Image from "next/image";

export interface TokenIconProps {
  alt?: string;
  src?: string;
  width?: number;
  height?: number;
}

const TokenIcon = ({ alt, src, width, height }: TokenIconProps) => (
  <div
    className="relative text-xs flex items-center justify-center rounded-full overflow-hidden"
    style={{ width, height }}
  >
    {src && alt && (
      <Image src={src} alt={alt} fill style={{ objectFit: "contain" }} />
    )}
  </div>
);

export default TokenIcon;
