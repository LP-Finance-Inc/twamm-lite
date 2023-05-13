import React from "react";
import { UseFormSetValue } from "react-hook-form";

import Toggle from "src/molecules/toggle";
import { FormConfigurator } from "src/types";

export default function Configurator({
  fixedInputMint,
  fixedOutputMint,
  fixedAmount,
  initialAmount,
  useWalletPassthrough,
  setValue,
}: {
  fixedInputMint: boolean;
  fixedOutputMint: boolean;
  fixedAmount: boolean;
  initialAmount: string;
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

      {/* Fixed input */}
      <div className="flex justify-between mt-5">
        <div>
          <p className="text-sm text-white/75">Fixed input mint</p>
          <p className="text-xs text-white/30">Input mint cannot be changed</p>
        </div>
        <Toggle className="min-w-[40px]" active={fixedInputMint} onClick={() => setValue("fixedInputMint", !fixedInputMint, { shouldDirty: true })} />
      </div>
      <div className="w-full border-b border-white/10 py-3" />

      {/* Fixed output */}
      <div className="flex justify-between mt-5">
        <div>
          <p className="text-sm text-white/75">Fixed output mint</p>
          <p className="text-xs text-white/30">Output mint cannot be changed</p>
        </div>
        <Toggle
          className="min-w-[40px]"
          active={fixedOutputMint}
          onClick={() => setValue("fixedOutputMint", !fixedOutputMint, { shouldDirty: true })}
        />
      </div>
      <div className="w-full border-b border-white/10 py-3" />

      {/* Fixed amount */}
      <div className="flex justify-between mt-5">
        <div>
          <p className="text-sm text-white/75">Fixed amount</p>
          <p className="text-xs text-white/30">Depending on Exact In / Exact Out, the amount cannot be changed</p>
        </div>
        <Toggle className="min-w-[40px]" active={fixedAmount} onClick={() => setValue("fixedAmount", !fixedAmount, { shouldDirty: true })} />
      </div>
      <div className="w-full border-b border-white/10 py-3" />

      <div className="flex justify-between mt-5">
        <div>
          <p className="text-sm text-white/75">Initial amount</p>
          <p className="text-xs text-white/30">Amount to be prefilled on first load</p>
        </div>
      </div>
      <input
        className="mt-2 text-white w-full flex justify-between items-center space-x-2 
        text-left rounded-md bg-white/10 px-4 py-2 text-sm font-medium shadow-sm border border-white/10"
        value={initialAmount}
        inputMode="numeric"
        onChange={(e) => {
          const regex = /^[0-9\b]+$/;
          const value = e.target.value;
          if (value === "" || regex.test(value)) {
            setValue("initialAmount", value);
          }
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
