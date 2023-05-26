import { useEffect } from "react";

export function useDebouncedEffect(fn: Function, deps: any[], time: number) {
  useEffect(() => {
    const timeout = setTimeout(fn, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [deps, fn, time]);
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export const expirationTimeToInterval = (
  expirationTime: number | undefined,
  tif: number
) => {
  if (!expirationTime) return tif;

  let delta = expirationTime * 1e3 - Date.now();
  delta = delta <= 0 ? 0 : Number((delta / 1e3).toFixed(0));

  return delta;
};

const userLocale =
  // eslint-disable-next-line no-nested-ternary
  typeof window !== "undefined"
    ? navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language
    : "en-US";

export const numberFormatter = new Intl.NumberFormat(userLocale, {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 9,
});

export const formatNumber = {
  format: (val?: number, precision?: number) => {
    if (!val && val !== 0) {
      return "--";
    }

    if (precision !== undefined) {
      return val.toFixed(precision);
    }
    return numberFormatter.format(val);
  },
};
