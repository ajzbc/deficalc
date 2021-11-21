import { writable, derived } from "svelte/store";

export const price = writable();
export const rewardYield = writable();
export const rebasesDay = writable();
export const balance = writable();

export const currentValue = derived([price, balance], ([$price, $balance]) => $price * $balance);

export const APY = derived(
    [rebasesDay, rewardYield],
    ([$rebasesDay, $rewardYield]) => (Math.pow($rewardYield / 100 + 1, $rebasesDay * 365) - 1) * 100
);

export const dailyYield = derived(
    [rewardYield, rebasesDay],
    ([$rewardYield, $rebasesDay]) => (Math.pow(1 + $rewardYield / 100, 1 * $rebasesDay) - 1) * 100
);

export const dailyStake = derived([dailyYield, balance], ([$dailyYield, $balance]) => ($dailyYield / 100) * $balance);

export const dailyReward = derived(
    [dailyYield, currentValue],
    ([$dailyYield, $currentValue]) => ($dailyYield / 100) * $currentValue
);

export const term = writable("");
export const items = writable([]);
export const filtered = derived([term, items], ([$term, $items]) =>
    $items.filter((x) => x.name.toLowerCase().includes($term.toLowerCase()))
);
