<script lang="ts">
    import type { PageData } from './$types';
    import HomeOutline from 'svelte-ionicons/HomeOutline.svelte';

    export let data: PageData;
</script>

<div>
    <a
        href="/"
        class="absolute right-1 top-12 z-20 rounded border border-surface-800 bg-surface-200 p-2 dark:border-surface-200 dark:bg-surface-600"
    >
        <HomeOutline class="h-6 w-6" />
    </a>
    <h1 class="w-full px-6 text-center font-sansita text-3xl">{data.title}</h1>
    <figure>
        <img
            src={data.image}
            alt={data.title}
            class="h-36 w-full rounded-t object-cover md:rounded-l md:rounded-t-none"
        />
        <figcaption class="text-center font-lato text-sm">{data.imageCaption}</figcaption>
    </figure>
    <div class="font-lato">{@html data.content}</div>
</div>
