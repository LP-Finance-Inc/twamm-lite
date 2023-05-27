import { useState, useCallback } from "react";
import { address } from "@twamm/client.js";
import { OrderSide } from "@twamm/types/lib";

import { WalletModal } from "src/molecules/wallet-modal";
import useWalletPassThrough from "src/contexts/wallet-passthrough-context";
import Header from "./header";
import TokenExchange, { TradeStruct } from "./token-exchange";

const DEFAULT_TRADE = {
  amount: 0,
  pair: [
    address.NATIVE_TOKEN_ADDRESS,
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  ] as AddressPair,
  type: OrderSide.buy,
};

export default function TwammApp() {
  const { isWalletModalOpen, setIsWalletModalOpen } = useWalletPassThrough();
  const [trade, setTrade] = useState<TradeStruct>(DEFAULT_TRADE);

  const onTradeChange = useCallback((next: TradeStruct) => {
    setTrade(next);
  }, []);
  return (
    <>
      <Header setIsWalletModalOpen={setIsWalletModalOpen} />
      <TokenExchange trade={trade} onTradeChange={onTradeChange} />
      {isWalletModalOpen ? (
        <div className="absolute h-full w-full flex justify-center items-center bg-black/50 rounded-lg overflow-hidden">
          <WalletModal setIsWalletModalOpen={setIsWalletModalOpen} />
        </div>
      ) : null}
    </>
  );
}
