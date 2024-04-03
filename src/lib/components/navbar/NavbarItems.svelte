<script lang="ts">
    export let name: string;
    export let url: string;
</script>

<li class="h-full flex ">
    <a href={url} class="w-full p-2 text-surface-100 bg-tertiary-900 rounded hover:bg-primary-500 hover:text-surface-50 transition-colors duration-400">
        {name}
    </a>
</li>