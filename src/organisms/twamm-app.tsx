import { useState } from "react";

import { Init } from "src/types";
import Header from "./header";

export default function TwammApp(props: Init) {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  return <Header setIsWalletModalOpen={setIsWalletModalOpen} />;
}
