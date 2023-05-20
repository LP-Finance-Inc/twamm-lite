import type { FC, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "@solana/wallet-adapter-react";

export interface NetworkConfigurationState {
  networkConfiguration: string | undefined;
  setNetworkConfiguration(networkConfiguration: string): void;
}

export const NetworkConfigurationContext = createContext<NetworkConfigurationState>({} as NetworkConfigurationState);

export const NetworkConfigurationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [networkConfiguration, setNetworkConfiguration] = useLocalStorage(
    "network",
    process.env.NEXT_PUBLIC_CLUSTER_NETWORK,
  );

  const ContextValue = useMemo(
    () => ({
      networkConfiguration,
      setNetworkConfiguration,
    }),
    [networkConfiguration, setNetworkConfiguration],
  );

  return <NetworkConfigurationContext.Provider value={ContextValue}>{children}</NetworkConfigurationContext.Provider>;
};

export function useNetworkConfiguration(): NetworkConfigurationState {
  return useContext(NetworkConfigurationContext);
}
