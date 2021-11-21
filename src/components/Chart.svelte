<script>
    import * as Pancake from "@sveltejs/pancake";
    import { ranges, options } from "../util/options";
    import { numberWithCommas } from "../util/util";

    import { price, balance, currentValue, dailyYield, dailyStake, dailyReward } from "../store";

    let collection = [];

    let range = 7;

    $: {
        collection = [
            {
                x: 0,
                value: $currentValue,
                balance: $balance,
                reward: $dailyReward,
                rebase: $dailyStake,
            },
        ];

        for (let i = 1; i <= range; i++) {
            let newer = {
                x: i,
                value: (collection[i - 1].balance + collection[i - 1].rebase) * $price,
                balance: collection[i - 1].balance + collection[i - 1].rebase,
                reward: ($dailyYield / 100) * (collection[i - 1].balance + collection[i - 1].rebase) * $price,
                rebase: ($dailyYield / 100) * (collection[i - 1].balance + collection[i - 1].rebase),
            };

            collection = [...collection, newer];
        }
    }

    let option = "value";

    let closest;

    function dateString(day) {
        let current = new Date();
        let future = new Date(current.getTime() + day * 24 * 60 * 60 * 1000);
        return `${future.toLocaleDateString(undefined, { month: "numeric", day: "numeric" })}`;
    }

    function formatNumber(n) {
        if (n < 1e3) return n;
        if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
        if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
        if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
        if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
    }

    $: console.log("chart", collection);
</script>

<div class="flex justify-between gap-3 flex-col sm:flex-row items-start">
    <div class="tab-group">
        {#each options as item}
            <button on:click={() => (option = item)} class={option == item ? "tab selected" : "tab"}>
                <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
            </button>
        {/each}
    </div>

    <div class="tab-group">
        {#each ranges as item}
            <button on:click={() => (range = item.days)} class={range == item.days ? "tab selected" : "tab"}>
                <span>{item.label}</span>
            </button>
        {/each}
    </div>
</div>

<div class="chart">
    <Pancake.Chart x1={0} x2={range} y1={collection[0][option]} y2={collection[range][option]}>
        <Pancake.Grid vertical count={7} let:value>
            <span class="x label">{dateString(value)}</span>
        </Pancake.Grid>

        <Pancake.Grid horizontal let:value>
            <div class="grid-line horizontal" />
            <span class="y label">{formatNumber(value)}</span>
        </Pancake.Grid>

        <Pancake.Svg>
            <Pancake.SvgLine data={collection} y={(d) => d[option]} let:d>
                <path class="data" {d} />
            </Pancake.SvgLine>
        </Pancake.Svg>

        {#if closest}
            <Pancake.Point x={closest.x} y={closest[option]}>
                <span class="annotation-point" />
                <div
                    class="annotation"
                    style="transform: translate(-{100 * ((closest.x - +Infinity) / (-Infinity - +Infinity))}%,0)"
                >
                    <span>{dateString(closest.x)}</span>
                    <strong>
                        {option == "value" || option == "reward"
                            ? `$${numberWithCommas(closest[option].toFixed(2))}`
                            : numberWithCommas(closest[option].toFixed(4))}
                    </strong>
                </div>
            </Pancake.Point>
        {/if}

        <Pancake.Quadtree data={collection} y={(d) => d[option]} bind:closest />
    </Pancake.Chart>
</div>

<style global lang="postcss">
    .tab-group {
        /* background: rgb(239, 242, 245); */
        padding: 3px;
        line-height: 1.5em;
        @apply bg-gray-100 flex rounded-lg;
    }

    .tab {
        /* color: rgb(88, 102, 126); */
        /* padding: 3px 9px; */
        @apply h-auto rounded-lg px-3 py-1 font-semibold text-gray-600 hover:bg-gray-50;
    }

    .tab span {
        font-weight: 600;
        white-space: nowrap;
        line-height: 2rem;
    }

    .selected {
        box-shadow: rgb(239, 242, 245) 0px 1px 0px;
        background: rgb(255, 255, 255) none repeat scroll 0% 0%;
    }

    .chart {
        height: 500px;
        padding: 3em 2em 2em 3em;
        box-sizing: border-box;
    }

    .pancake-chart {
        @apply border-l-2 border-b-2 border-gray-200;
    }

    .label {
        @apply text-gray-600;
    }

    .y.label {
        position: absolute;
        left: -2.5em;
        width: 2em;
        text-align: right;
        bottom: -0.5em;
    }

    .grid-line {
        position: relative;
        display: block;
    }

    .grid-line.horizontal {
        width: 100%;
        left: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .x.label {
        position: absolute;
        width: 4em;
        left: -2em;
        bottom: -32px;
        text-align: center;
    }

    path.data {
        stroke: #2b4bff;
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-width: 4px;
        fill: none;
    }

    .annotation {
        position: absolute;
        white-space: nowrap;
        bottom: 1em;
        line-height: 1.2;
        padding: 0.2em 0.4em;
        border-radius: 0.5rem;

        background-color: #fff;
        box-shadow: rgba(88, 102, 126, 0.08) 0px 1px 1px, rgba(88, 102, 126, 0.1) 0px 8px 16px;
    }

    .annotation-point {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #2b4bff;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }

    .annotation strong {
        @apply block text-lg;
    }

    .annotation span {
        @apply block text-gray-600;
    }
</style>
