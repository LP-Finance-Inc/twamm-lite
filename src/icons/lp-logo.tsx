import React from "react";
import Image from "next/image";

const JupiterLogo: React.FC<{ width?: number; height?: number }> = ({
  width = 24,
  height = 24,
}) => (
  <Image
    src="/lp-logo-mobile.png"
    width={width}
    height={height}
    alt="LP Finance"
  />
);

export default JupiterLogo;
