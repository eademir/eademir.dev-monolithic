<script lang="ts">
    import CustomInput from '$lib/components/input/CustomInput.svelte';
    import CustomTextArea from '$lib/components/textarea/CustomTextArea.svelte';
    import CustomButton from '$lib/components/button/CustomButton.svelte';

    export const id: string = '';

    let file: HTMLInputElement;
    let uploadedFiles: string[] = ['/upload/dldld.jpeg', '/upload/dfddfd.jpg'];
    let header: string = '';
    let keywords: string = '';
    let thumbnail: string = '';
    let description: string = '';
</script>

<div
    class="m-2 flex flex-col justify-between rounded-lg border bg-surface-100 text-surface-800 lg:max-w-[400px] dark:border-surface-200 dark:bg-surface-900 dark:text-surface-100"
>
    <div class="h-full w-full overflow-y-auto p-4">
        <input type="file" class="w-full" bind:this={file} />
        <div class="max-h-[400px] overflow-y-auto p-2">
            <ul class="list-disc">
                {#each uploadedFiles as uploadedFile}
                    <li>{uploadedFile}</li>
                {/each}
            </ul>
        </div>
        <div class="w-full">
            <img
                src={thumbnail === '' ? 'https://picsum.photos/400/200' : thumbnail}
                alt={header}
                class="h-full w-full py-2"
            />
            <CustomInput placeholder="thumbnail" value={thumbnail} />
        </div>
        <div class="py-2">
            <CustomInput value={header} placeholder="Header" />
        </div>
        <div class="py-2">
            <CustomTextArea value={keywords} placeholder="keywords" rows={3} />
        </div>
        <div class="py-2">
            <CustomTextArea value={description} placeholder="Description" rows={10} />
        </div>
    </div>
    <div class="px-4 pb-3 pt-1">
        {#if id.length === 0}
            <CustomButton text="Create" colour="" />
        {:else}
            <div class="flex">
                <CustomButton text="Update" colour="" />
                <CustomButton
                    text="Delete"
                    colour="bg-error-500 text-surface-100 hover:bg-error-600"
                />
            </div>
        {/if}
    </div>
</div>
