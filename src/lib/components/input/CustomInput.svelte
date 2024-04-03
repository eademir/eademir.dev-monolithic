<script lang="ts">
    export let value: string = '';
    export let placeholder: string;
    export let type: string;
    export let error: string[] | undefined;
    export let name: string | undefined;
    export let id: string | undefined;

    export let params: any = {};

    function typeAction(node: HTMLInputElement) {
        node.type = type;
    }
</script>

<div class="w-full font-lato">
    <slot name="label" />
    {#if params.required}
        <span class="text-error-600">*</span>
    {/if}
    <input
        use:typeAction
        bind:value
        {name}
        {id}
        aria-invalid={error ? 'true' : undefined}
        class="w-full rounded-lg border border-tertiary-500 bg-surface-200 p-2 font-lato text-surface-800 placeholder-error-400 ring-0 focus:outline-none aria-[invalid]:border-error-500 dark:bg-surface-900 dark:text-surface-50"
        {placeholder}
        {...params}
    />

    {#if error}
        <div>
            {#each error as message (message)}
                <p class="pt-0.5 font-lato text-xs text-error-400">
                    {message}
                </p>
            {/each}
        </div>
    {/if}
</div>
