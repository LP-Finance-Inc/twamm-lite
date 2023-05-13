import React from "react";
import { UseFormSetValue } from "react-hook-form";

import Toggle from "src/molecules/toggle";
import { FormConfigurator } from "src/types";

export default function Configurator({
  feeAccount,
  feeBps,
  platformFeeAccount,
  supportedToken,
  executionPeriod,
  useWalletPassthrough,
  setValue,
}: {
  feeAccount: string;
  feeBps: string;
  platformFeeAccount: string;
  supportedToken: string;
  executionPeriod: boolean;
  useWalletPassthrough: boolean;
  setValue: UseFormSetValue<FormConfigurator>;
}) {
  return (
    <div
      className="w-full max-w-full border border-white/10 md:border-none md:mx-0 md:max-w-[300px] max-h-[700px] 
    overflow-y-scroll overflow-x-hidden webkit-scrollbar bg-white/5 rounded-xl p-4"
    >
      <p className="text-white mt-2 text-sm font-semibold">Things you can configure</p>

      <div className="w-full border-b border-white/10 py-1" />

      {/* Execution Period */}
      <div className="flex justify-between mt-5">
        <div>
          <p className="text-sm text-white/75">Execution Period</p>
          <p className="text-xs text-white/30">execution period</p>
        </div>
        <Toggle
          className="min-w-[40px]"
          active={executionPeriod}
          onClick={() => setValue("executionPeriod", !executionPeriod, { shouldDirty: true })}
        />
      </div>
      <div className="w-full border-b border-white/10 py-3" />

      <div className="flex justify-between mt-5">
        <div>
          <p className="text-sm text-white/75">Fee Bps</p>
          <p className="text-xs text-white/30">feeBps</p>
        </div>
      </div>
      <input
        className="mt-2 text-white w-full flex justify-between items-center space-x-2 
        text-left rounded-md bg-white/10 px-4 py-2 text-sm font-medium shadow-sm border border-white/10"
        value={feeBps}
        inputMode="numeric"
        onChange={(e) => {
          const value = e.target.value;
          setValue("feeBps", value);
        }}
      />
      <div className="w-full border-b border-white/10 py-3" />

      <div className="flex justify-between mt-5">
        <div>
          <p className="text-sm text-white/75">Fee Account</p>
          <p className="text-xs text-white/30">feeAccount</p>
        </div>
      </div>
      <input
        className="mt-2 text-white w-full flex justify-between items-center space-x-2 
        text-left rounded-md bg-white/10 px-4 py-2 text-sm font-medium shadow-sm border border-white/10"
        value={feeAccount}
        inputMode="text"
        onChange={(e) => {
          const value = e.target.value;
          setValue("feeAccount", value);
        }}
      />
      <div className="w-full border-b border-white/10 py-3" />

      <div className="flex justify-between mt-5">
        <div>
          <p className="text-sm text-white/75">Platform Fee Account</p>
          <p className="text-xs text-white/30">platformFeeAccount</p>
        </div>
      </div>
      <input
        className="mt-2 text-white w-full flex justify-between items-center space-x-2 
        text-left rounded-md bg-white/10 px-4 py-2 text-sm font-medium shadow-sm border border-white/10"
        value={platformFeeAccount}
        inputMode="text"
        onChange={(e) => {
          const value = e.target.value;
          setValue("platformFeeAccount", value);
        }}
      />
      <div className="w-full border-b border-white/10 py-3" />

      <div className="flex justify-between mt-5">
        <div>
          <p className="text-sm text-white/75">Supported Token</p>
          <p className="text-xs text-white/30">supported token list</p>
        </div>
      </div>
      <input
        className="mt-2 text-white w-full flex justify-between items-center space-x-2 
        text-left rounded-md bg-white/10 px-4 py-2 text-sm font-medium shadow-sm border border-white/10"
        value={supportedToken}
        inputMode="text"
        onChange={(e) => {
          const value = e.target.value;
          setValue("supportedToken", value);
        }}
      />
      <div className="w-full border-b border-white/10 py-3" />

      {/* Wallet passthrough */}
      <div className="flex justify-between mt-5">
        <div>
          <p className="text-sm text-white/75">Simulate wallet passthrough</p>
          <p className="text-xs text-white/30">Simulate Terminal with a fake wallet passthrough</p>
        </div>
        <Toggle className="min-w-[40px]" active={useWalletPassthrough} onClick={() => setValue("useWalletPassthrough", !useWalletPassthrough)} />
      </div>
      <div className="w-full border-b border-white/10 py-3" />
    </div>
  );
}
