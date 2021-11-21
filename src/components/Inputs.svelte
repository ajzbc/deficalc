<script>
    import Select from "./Select.svelte";

    import { balance, rewardYield, rebasesDay } from "../store";

    let input_rewardYield;
    let input_rebasesDay = 3;
    let input_balance;

    $: $rewardYield = parseFloat(input_rewardYield);
    $: $rebasesDay = parseFloat(input_rebasesDay);
    $: $balance = parseFloat(input_balance);
</script>

<p>Price</p>
<Select />

<p>Reward Yield (%)</p>
<input type="text" bind:value={input_rewardYield} placeholder="0" />

<p>Rebases / Day</p>
<input type="text" bind:value={input_rebasesDay} placeholder="0" />

<p>Staked Balance</p>
<input type="text" bind:value={input_balance} placeholder="0" />

<style global lang="postcss">
    p {
        @apply leading-8 font-medium mt-3 text-lg first:mt-0;
    }

    input {
        @apply w-full bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 text-left text-lg cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500;
    }
</style>
