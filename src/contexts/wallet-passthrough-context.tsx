import type { FC, ReactNode } from "react";
import { createContext, useState, useContext } from "react";
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
  isWalletModalOpen: boolean;
  setIsWalletModalOpen: (toggle: boolean) => void;
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

export const WalletPassthroughContext = createContext<
  IWalletPassThrough | undefined
>(undefined);

export const WalletPassthroughProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const {
    publicKey,
    wallets,
    wallet,
    connect,
    select,
    connecting,
    connected,
    disconnect,
  } = useWallet();

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
        isWalletModalOpen,
        setIsWalletModalOpen,
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
      isWalletModalOpen,
      setIsWalletModalOpen,
    };
  })();

  return (
    <WalletPassthroughContext.Provider value={value}>
      {children}
    </WalletPassthroughContext.Provider>
  );
};

export default function useWalletPassThrough() {
  const context = useContext(WalletPassthroughContext);
  if (context === undefined) {
    throw new Error("Wallet pass through context is required");
  }
  return context;
}
