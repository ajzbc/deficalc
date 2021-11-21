<script>
    import { fly } from "svelte/transition";

    export let name;
    export let open = true;
</script>

<div class="mb-6">
    <button
        class="w-full flex flex-row justify-between items-center mb-5 rounded-lg px-3 py-2 cursor-pointer inputs bg-blue-100"
        on:click={() => (open = !open)}
    >
        <span class="flex">
            <slot name="icon" />
            <h2 class="text-2xl font-semibold text-blue-600">{name}</h2>
        </span>

        <span class="self-end {!open ? 'rotate-180' : ''}">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </span>
    </button>

    {#if open}
        <div class="px-5" in:fly={{ y: -50, duration: 100 }} out:fly={{ y: -50, duration: 100 }}>
            <slot name="component" />
        </div>
    {/if}
</div>
