import type { FC, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";

export type TwammLiteParamsContext = {
  readonly feeAccount: string;
  readonly feeBps: number;
  readonly platformFeeAccount: string;
  readonly supportedToken: string;
  readonly executionPeriod: boolean;
  readonly endpoint: string;
};

export const Context = createContext<TwammLiteParamsContext | undefined>(
  undefined
);

export const Provider: FC<{
  feeAccount: string;
  feeBps: string;
  platformFeeAccount: string;
  supportedToken: string;
  executionPeriod: boolean;
  endpoint: string;
  children: ReactNode;
}> = ({
  feeAccount,
  feeBps,
  platformFeeAccount,
  supportedToken,
  executionPeriod,
  endpoint,
  children,
}) => {
  const ContextValue = useMemo(
    () => ({
      feeAccount,
      feeBps: parseInt(feeBps, 10),
      platformFeeAccount,
      supportedToken,
      executionPeriod,
      endpoint,
    }),
    [
      feeAccount,
      feeBps,
      platformFeeAccount,
      supportedToken,
      executionPeriod,
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
