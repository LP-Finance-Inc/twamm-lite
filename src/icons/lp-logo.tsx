import React from "react";

const LPLogo: React.FC<{
  width?: number;
  height?: number;
  img?: string;
}> = ({ width = 24, height = 24, img }) => (
  <img
    src={img}
    width={width}
    height={height}
    alt="LP Finance"
    loading="lazy"
  />
);

export default LPLogo;
