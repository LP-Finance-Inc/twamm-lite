import React from "react";
import Image from "next/image";

const JupiterLogo: React.FC<{ width?: number; height?: number }> = ({ width = 24, height = 24 }) => {
  return <Image src={"https://jup.ag/svg/jupiter-logo.svg"} width={width} height={height} alt="Jupiter aggregator" />;
};

export default JupiterLogo;
