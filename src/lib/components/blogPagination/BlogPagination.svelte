<script lang="ts">
    export let pageNumber: number = 1;
    export let pageSize: number = 10;

    export let total: number = 100;
</script>

<div class="w-full flex justify-center text-xs">
    <button class=" bg-tertiary-500 hover:bg-primary-500 text-surface-100 font-bold py-2 px-3 rounded-l disabled:cursor-not-allowed disabled:bg-surface-400" disabled={pageNumber === 1} on:click={() => pageNumber--}>
        &#8678;
    </button>

    {#if Math.ceil(total / pageSize) <= 5 }
        <div class="flex flex-row">
            {#each Array(Math.ceil(total / pageSize)) as _, i}
                <button class={(i + 1 === pageNumber ? "bg-secondary-500" : " bg-tertiary-500") + " " + "hover:bg-primary-500 text-surface-100 font-bold py-2 px-3"} class:font-bold={pageNumber === i + 1} on:click={() => pageNumber = i + 1}>
                    {i + 1}
                </button>
            {/each}
        </div>
    {:else}
        <div class="flex flex-row">
            {#if pageNumber > 2}
                <button class=" bg-tertiary-500 hover:bg-primary-500 text-surface-100 font-bold py-2 px-3" on:click={() => pageNumber = 1}>
                    1
                </button>
            {/if}
            {#if pageNumber > 3}
                <button class=" bg-tertiary-500 md:hover:bg-primary-500 text-surface-100 font-bold py-2 px-3" on:click={() => pageNumber -= 3}>
                    ...
                </button>
            {/if}

            {#if pageNumber > 1}
                <button class=" bg-tertiary-500 hover:bg-primary-500 text-surface-100 font-bold py-2 px-3" on:click={() => pageNumber--}>
                    {pageNumber - 1}
                </button>
            {/if}

            <button class={(pageNumber === pageNumber ? "bg-secondary-500" : " bg-tertiary-500") + " " + "hover:bg-primary-500 text-surface-100 font-bold py-2 px-3"} on:click={() => pageNumber = pageNumber}>
                {pageNumber}
            </button>

            {#if pageNumber < Math.ceil(total / pageSize)}
                <button class=" bg-tertiary-500 hover:bg-primary-500 text-surface-100 font-bold py-2 px-3" on:click={() => pageNumber++}>
                    {pageNumber + 1}
                </button>
            {/if}

            {#if pageNumber < Math.ceil(total / pageSize) - 2}
                <button class=" bg-tertiary-500 md:hover:bg-primary-500 text-surface-100 font-bold py-2 px-3" on:click={() =>  pageNumber += 3 }>
                    ...
                </button>
            {/if}
            {#if pageNumber < Math.ceil(total / pageSize) - 1}
                <button class=" bg-tertiary-500 hover:bg-primary-500 text-surface-100 font-bold py-2 px-3" on:click={() => pageNumber = Math.ceil(total / pageSize)}>
                    {Math.ceil(total / pageSize)}
                </button>
            {/if}
        </div>
    {/if}

    <button class=" bg-tertiary-500 hover:bg-primary-500 text-surface-100 font-bold py-2 px-3 rounded-r disabled:cursor-not-allowed disabled:bg-surface-400" disabled={pageNumber === Math.ceil(total / pageSize) || total === 0} on:click={() => pageNumber++}>
        &#8680;
    </button>
</div>