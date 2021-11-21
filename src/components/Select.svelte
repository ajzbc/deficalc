<script>
    import { items, term, filtered } from "../store";
    import { onMount } from "svelte";
    import { clickOutside, focus } from "../util/util";

    import { price } from "../store";

    onMount(async () => {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/list`);
        let values = await response.json();
        items.set(values);
    });

    let searchValue = "";
    $: term.set(searchValue);

    let open = false;

    let selection;
    $: if (selection?.price) $price = selection.price;

    let loading = false;

    $: if (!open && selection) {
        searchValue = `${selection.name} (${selection.symbol.toUpperCase()})`;
    }

    function toggle() {
        if (!open) {
            searchValue = "";
        }
        open = !open;
    }

    async function select(coin) {
        open = false;
        selection = coin;
        loading = true;
        selection.price = await getPrice(coin.id);
        loading = false;
    }

    async function getPrice(id) {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`
        );
        return (await response.json()).market_data.current_price.usd;
    }
</script>

<div class="relative" use:clickOutside on:click_outside={() => (open = false)}>
    <div class="relative">
        <span class="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
            {#if loading}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                    />
                </svg>
            {:else if selection && !open}
                <span class="text-lg">${selection.price}</span>
            {:else if !open}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            {/if}
        </span>
        <input
            type="text"
            placeholder="Search"
            autocomplete="off"
            bind:value={searchValue}
            on:click={toggle}
            on:keydown={() => (open = true)}
            use:focus
        />
    </div>

    {#if open && searchValue}
        <ul
            class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none text-lg"
            tabindex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
        >
            {#each $filtered.slice(0, 10) as coin}
                <!-- weird onclick because it wouldn't open otherwise -->
                <li
                    class="text-gray-900 cursor-default select-none relative py-2 px-3 hover:text-white hover:bg-blue-600"
                    id="listbox-option-0"
                    role="option"
                    on:click={() => select(coin)}
                >
                    <div class="flex items-center">
                        <span class="font-normal block truncate"> {coin.name} ({coin.symbol.toUpperCase()}) </span>
                    </div>
                </li>
            {/each}
        </ul>
    {/if}
</div>
