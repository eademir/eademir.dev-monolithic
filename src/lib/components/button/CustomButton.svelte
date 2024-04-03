<script lang="ts">
    export let isDisabled = false;
    export let text = 'Submit';

    export let colour: string = '';
    export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button';

    export let onClick = () => {};
</script>

<button
    class={(colour === ''
        ? 'tertiary-500 bg-primary-500 text-surface-200 hover:bg-secondary-500'
        : colour) +
        ' ' +
        'my-1 w-full rounded-lg p-2 font-sansita text-surface-100 shadow-surface-400 ring-0 transition-all hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-30'}
    disabled={isDisabled}
    {type}
    on:click={() => onClick()}>{text}</button
>
