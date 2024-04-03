<script lang="ts">
    export let value: string;
    export let placeholder: string;
    export let name: string | undefined;
    export let error: string[] | undefined;
    export let rows: number = 5;

    export let params: any = {};
</script>

<label class="my-2 inline-block w-full">
    <slot name="label" />
    {#if params.required}
        <span class="text-error-600">*</span>
    {/if}
    <textarea
        bind:value
        {name}
        {rows}
        aria-invalid={error ? 'true' : undefined}
        class="w-full rounded-lg border border-tertiary-500 bg-surface-200 p-2 font-lato text-surface-800 placeholder-error-400 focus:outline-none aria-[invalid]:border-error-500 dark:bg-surface-900 dark:text-surface-50"
        {placeholder}
        {...params}
    ></textarea>
    {#if error}
        <span class="text-xs text-error-400">
            {error}
        </span>
    {/if}
</label>
