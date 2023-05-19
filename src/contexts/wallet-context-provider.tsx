import type { FC, ReactNode } from "react";
import { useMemo, useCallback } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { GlowWalletAdapter } from "@solana/wallet-adapter-glow";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";

import { useNetworkConfiguration } from "./network-configuration-provider";
import { useAutoConnect } from "./auto-connect-provider";

export const WalletContextProvider: FC<{ endpoint?: string; children: ReactNode }> = ({ endpoint, children }) => {
  const { autoConnect } = useAutoConnect();
  const { networkConfiguration } = useNetworkConfiguration();
  const network = networkConfiguration as WalletAdapterNetwork;
  const selectedEndpoint: string = useMemo(() => endpoint ?? clusterApiUrl(network), [endpoint, network]);

  const passThroughWallet = (() => {
    if (typeof window === "undefined") return undefined;
    return window.Twamm.passThroughWallet;
  })();

  const wallets = useMemo(() => {
    if (passThroughWallet) {
      return [];
    }

    return [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BackpackWalletAdapter(),
      new GlowWalletAdapter(),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network]);

  const onError = useCallback((error: WalletError) => {
    // eslint-disable-next-line no-console
    console.error("error", { type: "error", message: error.message ? `${error.name}: ${error.message}` : error.name });
  }, []);

  return (
    <ConnectionProvider endpoint={selectedEndpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
