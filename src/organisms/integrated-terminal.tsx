import React, { useEffect } from "react";
import { Wallet } from "@solana/wallet-adapter-react";

export default function IntegratedTerminal({ rpcUrl, fakeWallet }: { rpcUrl: string | undefined; fakeWallet: Wallet | null }) {
  useEffect(() => {}, [rpcUrl, fakeWallet]);

  function hanldeOpen() {
    window.Twamm.init({
      displayMode: "modal",
      endpoint: "https://rpc.helius.xyz/?api-key=d1b1b418-ee2e-4c0b-92e5-35d2c6edd259",
    });
  }

  return <button onClick={hanldeOpen}>IntegratedTerminal </button>;
}
