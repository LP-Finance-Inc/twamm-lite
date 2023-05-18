import { createContext, useContext, useMemo, useCallback, useState } from "react";

import type { IntervalVariant, IndexedTIF } from "src/domain/interval.d";
import { SpecialIntervals } from "src/domain/interval.d";

export type TIFContext = {
  readonly periodSelected?: IntervalVariant;
  readonly periodTifs?: TIF[];
  readonly scheduled: boolean;
  readonly scheduleSelected?: IntervalVariant;
  readonly scheduleTifs?: TIF[];
  readonly selected?: IntervalVariant;
  readonly setIntervals: (i?: IndexedTIF[]) => void;
  readonly setOptions: (o: { minTimeTillExpiration: number }) => void;
  readonly setTif: (e: IntervalVariant, s: ScheduleTIF) => void;
  readonly tifs?: IndexedTIF[];
};

export const Context = createContext(undefined);
