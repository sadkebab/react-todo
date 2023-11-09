import { useMemo, useState } from "react";

export function throttle<Args extends unknown[]>(
  fn: (...args: Args) => void,
  cooldown: number,
) {
  let lastArgs: Args | undefined;

  const run = () => {
    if (lastArgs) {
      fn(...lastArgs);
      lastArgs = undefined;
    }
  };

  const throttled = (...args: Args) => {
    const isOnCooldown = !!lastArgs;

    lastArgs = args;

    if (isOnCooldown) {
      return;
    }

    window.setTimeout(run, cooldown);
  };

  return throttled;
}

export function useTooltip(content: string) {
  return {
    "data-tooltip-id": "tooltip",
    "data-tooltip-content": content,
    "data-tooltip-delay-show": 0,
  };
}
