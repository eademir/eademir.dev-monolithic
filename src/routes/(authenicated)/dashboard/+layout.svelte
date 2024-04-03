<script lang="ts">
    import Navbar from '$lib/components/navbar/Navbar.svelte';
    import { onMount } from 'svelte';
</script>

<div class="text-dark dark:text-light min-h-screen w-full">
    <Navbar dashboard={true} />
    <slot />
</div>
