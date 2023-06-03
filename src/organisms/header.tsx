import Link from "next/link";
import M, { Extra } from "easy-maybe/lib";
import type { FC } from "react";
import { useEffect, useRef, useCallback, useState } from "react";

import JupiterLogo from "src/icons/jupiter-logo";
import SettingIcon from "src/icons/setting-icon";
import OrdersIcon from "src/icons/order-icon";
import TransactionRunnerModal from "src/molecules/transaction-runner-modal";
import useTxRunner from "src/contexts/transaction-runner-context";
import UniversalPopover, { Ref } from "src/molecules/universal-popover";
import WalletButton from "./wallet-button";
import TransactionProgress from "./transaction-progress";
import AccountOrders from "./account-orders";

const Header: FC<{
  setIsWalletModalOpen(toggle: boolean): void;
  setIsOpenSetting(toggle: boolean): void;
}> = ({ setIsWalletModalOpen, setIsOpenSetting }) => {
  const runnerRef = useRef<Ref>();
  const { active } = useTxRunner();

  const [isOpenOrders, setIsOpenOrders] = useState<boolean>(false);

  useEffect(() => {
    M.andMap(([runner]) => {
      if (!runner.isOpened) runner.open();
    }, Extra.combine2([M.of(runnerRef.current), M.of(!active && undefined)]));

    return () => {};
  }, [active, runnerRef]);

  const onTxStatusToggle = useCallback((flag: boolean) => {
    if (flag) runnerRef.current?.open();
    else runnerRef.current?.close();
  }, []);

  return (
    <>
      <UniversalPopover ref={runnerRef} arrow={false} universal>
        <TransactionRunnerModal />
      </UniversalPopover>

      {isOpenOrders ? (
        <div className="fixed h-screen w-screen top-0 left-0 flex justify-center items-center overflow-hidden bg-black/50 z-50 px-2 md:px-0">
          <AccountOrders closeModal={() => setIsOpenOrders(false)} />
        </div>
      ) : null}

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
              onClick={() => setIsOpenOrders(true)}
            >
              <OrdersIcon height={14} width={14} />
            </button>

            <TransactionProgress setOpen={() => onTxStatusToggle(true)} />
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
    </>
  );
};

export default Header;
