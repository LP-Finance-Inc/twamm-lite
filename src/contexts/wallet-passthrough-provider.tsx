import type { FC, ReactNode } from "react";
import { createContext, useContext } from "react";
import { WalletName, WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

interface IWalletPassThrough {
  publicKey: PublicKey | null;
  wallets: Wallet[];
  wallet: Wallet | null;
  connect: () => Promise<void>;
  select: (walletName: WalletName<string>) => void;
  connecting: boolean;
  connected: boolean;
  disconnect: () => Promise<void | null>;
}

const initialPassThrough = {
  publicKey: null,
  wallets: [],
  wallet: null,
  connect: async () => {},
  select: () => {},
  connecting: false,
  connected: false,
  disconnect: async () => {},
};

export const WalletPassthroughContext = createContext<IWalletPassThrough>(initialPassThrough);

export function useWalletPassThrough(): IWalletPassThrough {
  return useContext(WalletPassthroughContext);
}

const WalletPassthroughProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { publicKey, wallets, wallet, connect, select, connecting, connected, disconnect } = useWallet();

  const value = (() => {
    const { passThroughWallet } = window.Twamm;

    if (Boolean(passThroughWallet) && passThroughWallet?.adapter.publicKey) {
      return {
        ...initialPassThrough,
        publicKey: passThroughWallet?.adapter.publicKey,
        wallet: {
          adapter: passThroughWallet.adapter,
          readyState: WalletReadyState.Loadable,
        },
        connecting: false,
        connected: true,
        disconnect: async () => {
          if (passThroughWallet?.adapter.disconnect) {
            return passThroughWallet?.adapter.disconnect();
          }
          return null;
        },
      };
    }

    return {
      publicKey,
      wallets,
      wallet,
      connect,
      select,
      connecting,
      connected,
      disconnect,
    };
  })();

  return <WalletPassthroughContext.Provider value={value}>{children}</WalletPassthroughContext.Provider>;
};

export default WalletPassthroughProvider;
