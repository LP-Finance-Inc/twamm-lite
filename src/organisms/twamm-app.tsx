import { useState } from "react";

import { WalletModal } from "src/molecules/wallet-modal";
import Header from "./header";

export default function TwammApp() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  return (
    <>
      <Header setIsWalletModalOpen={setIsWalletModalOpen} />
      {isWalletModalOpen ? (
        <div className="absolute h-full w-full flex justify-center items-center bg-black/50 rounded-lg overflow-hidden">
          <WalletModal setIsWalletModalOpen={setIsWalletModalOpen} />
        </div>
      ) : null}
    </>
  );
}
