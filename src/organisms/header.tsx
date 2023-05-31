import Link from "next/link";
import type { FC } from "react";

import JupiterLogo from "src/icons/jupiter-logo";
import SettingIcon from "src/icons/setting-icon";
import WalletButton from "./wallet-button";

const Header: FC<{
  setIsWalletModalOpen(toggle: boolean): void;
  setIsOpenSetting(toggle: boolean): void;
}> = ({ setIsWalletModalOpen, setIsOpenSetting }) => (
  <div className="mt-2 h-7 pl-3 pr-2">
    <div className="w-full flex items-center justify-between">
      <Link
        href="https://"
        target="_blank"
        rel="noreferrer noopener"
        className="flex items-center space-x-2"
      >
        <JupiterLogo width={24} height={24} />
        <span className="font-bold text-sm text-white">Jupiter</span>
      </Link>

      <div className="flex space-x-1 items-center">
        <button
          type="button"
          className="p-2 h-7 w-7 flex items-center justify-center border rounded-full border-white/10 bg-black/10 text-white/30 fill-current"
          onClick={() => setIsOpenSetting(true)}
        >
          <SettingIcon height={16} width={16} />
        </button>

        <WalletButton setIsWalletModalOpen={setIsWalletModalOpen} />
      </div>
    </div>
  </div>
);

export default Header;
