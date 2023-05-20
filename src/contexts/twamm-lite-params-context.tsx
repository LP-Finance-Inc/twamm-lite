import type { FC, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";

export type TwammLiteParamsContext = {
  readonly feeAccount: string;
  readonly feeBps: string;
  readonly platformFeeAccount: string;
  readonly supportedToken: string;
  readonly executionPeriod: boolean;
};

export const Context = createContext<TwammLiteParamsContext | undefined>(undefined);

export const Provider: FC<{
  feeAccount: string;
  feeBps: string;
  platformFeeAccount: string;
  supportedToken: string;
  executionPeriod: boolean;
  children: ReactNode;
}> = ({ feeAccount, feeBps, platformFeeAccount, supportedToken, executionPeriod, children }) => {
  const ContextValue = useMemo(
    () => ({
      feeAccount,
      feeBps,
      platformFeeAccount,
      supportedToken,
      executionPeriod,
    }),
    [feeAccount, feeBps, platformFeeAccount, supportedToken, executionPeriod],
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
