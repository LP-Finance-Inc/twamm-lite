import M from "easy-maybe/lib";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";

import usePrice from "src/hooks/use-price";
import useBalance from "src/hooks/use-balance";
import { add, keepPrevious, refreshEach } from "src/swr-options";
import useIndexedTIFs from "src/contexts/tif-context";
import TokenSelect from "src/atoms/token-select";
import type { IntervalVariant } from "../domain/interval.d";

export default ({
  amount,
  primary,
  onABSwap,
  onASelect,
  onBSelect,
  onChangeAmount,
  onIntervalSelect,
  onSubmit,
  secondary,
  submitting,
}: {
  amount?: number;
  primary?: JupToken;
  onABSwap: () => void;
  onASelect: () => void;
  onBSelect: () => void;
  onChangeAmount: (arg0: number) => void;
  onIntervalSelect: (a: IntervalVariant, b: boolean) => void;
  onSubmit: () => void;
  secondary?: JupToken;
  submitting: boolean;
}) => {
  const [a, b] = [primary, secondary];
  const outRef = useRef<number>(0);
  const outValueRef = useRef<number>(0);
  const [pairAmount, setPairAmount] = useState<number>(0);
  const [isPending, setPending] = useState<boolean>(false);
  const balance = useBalance(a?.address, add([keepPrevious(), refreshEach()]));
  const { tifs: intervalTifs, selected } = useIndexedTIFs();
  const pairPrice: any = usePrice(a?.address ? { id: a?.address } : undefined);

  const onChange = useCallback(
    (next: number) => {
      setPairAmount(next);
      onChangeAmount(next);
    },
    [onChangeAmount, setPairAmount]
  );

  const onMaxClick = useCallback(() => {
    M.andMap(onChange, M.of(balance.data));
  }, [onChange, balance.data]);

  const displayBalance = M.withDefault<string | number>(
    "0",
    M.of(balance.data)
  );

  const sellRate = useMemo(() => {
    try {
      if (amount && amount > 0 && selected.tif) {
        const sRate = amount / (selected.tif / 60);
        const sRateFormatted = sRate
          ?.toFixed(10)
          ?.match(/^-?\d*\.?0*\d{0,3}/)?.[0];
        return Number(sRateFormatted);
      }
      return 0;
    } catch (error) {
      return 0;
    }
  }, [amount, selected]);

  const handleSwap = () => {
    onABSwap();
  };
  const handleInputSelect = () => {
    onASelect();
  };

  const handleOutputSelect = () => {
    onBSelect();
  };

  const handleIntervalSelect = useCallback(
    (indexed: IntervalVariant, schedule: boolean) => {
      onIntervalSelect(indexed, schedule);
    },
    [onIntervalSelect]
  );

  const price = usePrice({
    id: b?.address as string,
  });

  const priceA = usePrice({
    id: a?.address as string,
  });

  useEffect(() => {
    setPending(true);
    function getOutAmount() {
      const tokenA = a?.address;
      const tokenB = b?.address;
      const tokenBDecimals = b?.decimals;
      const tokenAFormattedAmount = Math.floor(
        (amount ?? 0) * 10 ** (a?.decimals ?? 0)
      );
      // Calculate with TIF intervals
      let tifPeriod;
      let epochs: number;
      let tifAccountedTokenAFormattedAmount;
      const crankInterval = 10; // 10 seconds
      if (selected?.tif) {
        tifPeriod = selected?.tif;
        epochs = tifPeriod / crankInterval;
        tifAccountedTokenAFormattedAmount = (
          tokenAFormattedAmount / epochs
        ).toFixed(0);
      } else {
        tifPeriod = 1;
        epochs = 1;
        tifAccountedTokenAFormattedAmount = tokenAFormattedAmount;
      }

      fetch(
        `https://quote-api.jup.ag/v4/quote?inputMint=${tokenA}&outputMint=${tokenB}&amount=${tifAccountedTokenAFormattedAmount}&onlyDirectRoutes=true`
      )
        .then((res) => res.json())
        .then((data) => {
          const bestRoute = data.data[0];
          const { outAmount } = bestRoute;

          const tifAccountedAmount = outAmount * epochs;
          if (tokenBDecimals) {
            const OutAmount = tifAccountedAmount / 10 ** tokenBDecimals;

            outRef.current = OutAmount;
            outValueRef.current = Number(
              (OutAmount * price.data)
                ?.toFixed(10)
                ?.match(/^-?\d*\.?0*\d{0,2}/)?.[0]
            );
            setPending(false);
          } else {
            outRef.current = 0;
            outValueRef.current = 0;
            setPending(false);
          }
        })
        .catch(() => {
          outRef.current = 0;
          outValueRef.current = 0;
          setPending(false);
        });
    }

    const debounceTime = setTimeout(() => {
      getOutAmount();
    }, 300);

    return () => clearTimeout(debounceTime);
  }, [amount, a, b, selected, price.data]);

  return (
    <form onSubmit={onSubmit} id="exchange-form">
      <div className="h-full flex flex-col items-center justify-center pb-4">
        <div className="w-full mt-2 rounded-xl flex flex-col px-2">
          <div className="flex-col">
            <div
              className={classNames(
                "border-b border-transparent bg-[#212128] rounded-xl transition-all"
              )}
            >
              <div
                className={classNames("px-x border-transparent rounded-xl ")}
              >
                <div>
                  <div
                    className={classNames(
                      "py-5 px-4 flex flex-col dark:text-white"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <TokenSelect
                        alt={a?.symbol}
                        disabled={!a}
                        image={a?.logoURI}
                        label={a?.symbol}
                        onClick={handleInputSelect}
                      />

                      <div className="text-right">a</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};