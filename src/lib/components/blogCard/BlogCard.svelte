<script lang="ts">
    export let admin: boolean = false;

    export let id = 1;
    export let image = 'https://picsum.photos/seed/picsum/500/500';
    export let title = 'Lorem Ipsum Dolor Sit Amet';
    export let description =
        'Aenean consequat hendrerit molestie. Etiam commodo fermentum sapien, eu accumsan ligula condimentum in. Phasellus bibendum, elit lobortis porta bibendum, orci nunc dapibus est, ut aliquam nisi leo et ante. Praesent condimentum luctus augue id lacinia. Quisque dictum libero eget euismod venenatis.';
</script>

<a href={'blogs/' + (admin ? 'create-blog/' : '') + id}>
    <div
        class="my-4 flex min-h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded border border-tertiary-500 bg-surface-50 text-surface-900 md:flex-row dark:bg-surface-500 dark:text-surface-50"
    >
        <div class="h-[300px] overflow-hidden md:w-2/3">
            <figure class="h-max">
                <img
                    src={image}
                    alt={title}
                    class="h-max w-full rounded-t object-cover md:rounded-l md:rounded-t-none"
                />
            </figure>
        </div>
        <div class="h-full w-full">
            <div class="p-4">
                <h3 class="text-xl font-bold">{title}</h3>
                <p class="hyphens-auto break-words text-justify text-base">{description}</p>
            </div>
        </div>
    </div>
</a>
