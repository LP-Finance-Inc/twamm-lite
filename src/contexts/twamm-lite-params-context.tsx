import type { FC, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";

import { TokenRegistry } from "src/types";
import useTokenPair from "src/hooks/use-token-pair";

export type TwammLiteParamsContext = {
  readonly feeAccount: string;
  readonly feeBps: number;
  readonly platformFeeAccount: string;
  readonly supportedToken: TokenRegistry;
  readonly useJupiter: boolean;
  readonly endpoint: string;
};

export const Context = createContext<TwammLiteParamsContext | undefined>(
  undefined
);

export const Provider: FC<{
  feeAccount: string;
  feeBps: string;
  platformFeeAccount: string;
  supportedToken: TokenRegistry;
  useJupiter: boolean;
  endpoint: string;
  children: ReactNode;
}> = ({
  feeAccount,
  feeBps,
  platformFeeAccount,
  supportedToken,
  useJupiter,
  endpoint,
  children,
}) => {
  const { data } = useTokenPair();

  const ContextValue = useMemo(
    () => ({
      feeAccount: feeAccount || "9pvCGNF2aw43Smb4J1pdyobq6PnjwkhXkuFov8P42S5w",
      feeBps: parseInt(feeBps, 10) || 0,
      platformFeeAccount: platformFeeAccount || "",
      supportedToken: supportedToken || data,
      useJupiter,
      endpoint,
    }),
    [
      feeAccount,
      feeBps,
      platformFeeAccount,
      supportedToken,
      data,
      useJupiter,
      endpoint,
    ]
  );

  return <Context.Provider value={ContextValue}>{children}</Context.Provider>;
};

export default function useTwammLiteParams() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("Twamm lite params context is required");
  }
  return context;
}
