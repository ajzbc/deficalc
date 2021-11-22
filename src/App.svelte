<script>
    import Folder from "./components/Folder.svelte";

    import Inputs from "./components/Inputs.svelte";
    import Chart from "./components/Chart.svelte";

    import { numberWithCommas } from "./util/util";

    import {
        price,
        balance,
        currentValue,
        APY,
        rewardYield,
        rebasesDay,
        dailyYield,
        dailyStake,
        dailyReward,
    } from "./store";
</script>

<main class="mx-auto my-0 max-w-3xl">
    <div class="flex justify-between gap-4 flex-col sm:flex-row mb-12">
        <h1 class="text-3xl font-extrabold self-center text-blue-600 flex items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="inline h-12 w-12 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z"
                    clip-rule="evenodd"
                />
            </svg>
            <span>DeFi Calc</span>
        </h1>
        <!-- <button class="bg-gray-100 px-3 py-2 rounded-lg text-xl font-bold">connect wallet</button> -->
    </div>

    <div class="flex gap-4 flex-col md:flex-row mb-10">
        <div class="inputs flex flex-col px-5 py-4 rounded-lg w-full">
            <Inputs />
        </div>

        <div class="calc py-4 px-5 w-full">
            <p>Current</p>
            <table>
                <tbody>
                    <tr>
                        <th>Value</th>
                        <td>${$currentValue ? numberWithCommas($currentValue.toFixed(2)) : 0}</td>
                    </tr>
                    <tr>
                        <th>APY</th>
                        <td>{$APY ? numberWithCommas($APY.toFixed(2)) : 0}%</td>
                    </tr>
                </tbody>
            </table>

            <p>Daily</p>
            <table>
                <tbody>
                    <tr>
                        <th>ROI</th>
                        <td>{$dailyYield ? numberWithCommas($dailyYield.toFixed(4)) : 0}%</td>
                    </tr>
                    <tr>
                        <th>Rebase</th>
                        <td>{$dailyStake ? numberWithCommas($dailyStake.toFixed(4)) : 0}</td>
                    </tr>
                    <tr>
                        <th>Value</th>
                        <td>${$dailyReward ? numberWithCommas($dailyReward.toFixed(2)) : 0}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <Folder name={"Chart"}>
        <svg
            slot="icon"
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 mr-2 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fill-rule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clip-rule="evenodd"
            />
        </svg>
        <Chart slot="component" />
    </Folder>
</main>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .inputs {
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }

    .calc p {
        @apply text-black font-medium text-lg;
    }

    .calc table {
        @apply mb-5 w-full text-left border-t-2 border-gray-100;
    }

    .calc th {
        @apply font-medium text-gray-600;
    }

    .calc td {
        @apply text-right font-bold;
    }
</style>
