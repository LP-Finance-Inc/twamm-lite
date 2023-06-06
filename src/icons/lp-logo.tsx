import React from "react";

const LPLogo: React.FC<{ width?: number; height?: number }> = ({
  width = 24,
  height = 24,
}) => (
  <img
    src="https://lite.lp.finance/lp-logo-mobile.png"
    width={width}
    height={height}
    alt="LP Finance"
    loading="lazy"
  />
);

export default LPLogo;
