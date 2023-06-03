import type { ChangeEvent } from "react";
import { memo, useCallback } from "react";

import i18n from "src/i18n/en.json";

const values = [25, 50, 75, 100];

export default memo(
  ({
    percentage,
    onChange,
    onToggleDetails,
  }: {
    percentage: number;
    onChange: (amount: number) => void;
    onToggleDetails: () => void;
  }) => {
    const onPercentageChange = useCallback(
      (event: ChangeEvent) => {
        const value = event.target as unknown as number | number[];

        if (Array.isArray(value)) {
          onChange(value[0]);
        } else {
          onChange(value);
        }
      },
      [onChange]
    );

    return (
      <div className="w-full">
        <div className="flex flex-row justify-between items-baseline">
          <h6 className="p-2 text-center">{i18n.OrderFlowControlAmount}</h6>
          <span className="cursor-pointer p-2" onClick={onToggleDetails}>
            {i18n.OrderFlowCancelDetails}
          </span>
        </div>
        <div className="p-0">
          <p className="p-2">{percentage}%</p>
          <div className="p-2">
            <input
              type="range"
              min="1"
              max="100"
              value={percentage}
              id="myRange"
              onChange={onPercentageChange}
            />
          </div>
          <div className="flex justify-between flex-row p-2">
            {values.map((value) => (
              <div
                className="text-gray-400"
                key={`percentage-${value}`}
                onClick={() => onChange(value)}
              >
                {value}%
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
