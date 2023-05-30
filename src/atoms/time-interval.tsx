import type { ChangeEvent, SyntheticEvent } from "react";
import { useCallback, useMemo } from "react";

import Intervals from "src/molecules/interval-button-group";
import type { IndexedTIF } from "src/domain/interval.d";
import TechInfoIcon from "src/icons/tech-info-icon";
import Tooltip from "src/atoms/tooltip";

export default ({
  disabled,
  info,
  label,
  onSelect,
  value,
  valueIndex,
  values,
}: {
  disabled: boolean;
  info?: string;
  label: string;
  onSelect: (arg0: number) => void;
  value?: number | IndexedTIF;
  valueIndex?: number;
  values?: number[];
}) => {
  const intervalValues = useMemo(() => values, [values]);

  const onIntervalSelect = useCallback(
    (e: SyntheticEvent<HTMLElement>) => {
      const event: unknown = e;
      const { target } = event as ChangeEvent<HTMLElement>;

      onSelect(Number(target.getAttribute("data-interval")));
    },
    [onSelect]
  );

  return (
    <div className="w-full">
      <div className="pb-1">
        <label
          htmlFor="title"
          className="flex items-center gap-x-2 text-sm text-white/70 fill-current"
        >
          {label}
          <div className="cursor-pointer">
            <Tooltip
              variant="dark"
              content={<div className="text-white text-xs">{info}</div>}
            >
              <div className="flex items-center text-white-35 fill-current">
                <TechInfoIcon />
              </div>
            </Tooltip>
          </div>
        </label>
      </div>
      <div>
        <Intervals
          disabled={disabled}
          onClick={onIntervalSelect}
          value={value}
          valueIndex={valueIndex}
          valuesOpt={1}
          values={intervalValues}
        />
      </div>
    </div>
  );
};
