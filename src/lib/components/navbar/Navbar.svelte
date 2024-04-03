<script lang="ts">
    import NavbarItems from './NavbarItems.svelte';
    import { goto } from '$app/navigation';

    export let dashboard: boolean;
    interface NavbarItem {
        name: string;
        href: string;
    }

    const dashboardItems: NavbarItem[] = [
        { name: 'Home', href: '/dashboard' },
        { name: 'About Me', href: '/dashboard/about' },
        { name: 'Blogs', href: '/dashboard/blogs' },
    ];

    const userItems: NavbarItem[] = [
        { name: 'Home', href: '/' },
        { name: 'Blogs', href: '/blogs' },
    ];

    const handleLogout = async () => {
        await fetch('?/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(res => {
            if (res.ok) {
                goto('/login', { replaceState: true });
            }
        });
    };
</script>

<nav class="fixed flex w-full items-center">
    <ul class="ml-4 mt-4 flex flex-row rounded bg-tertiary-900">
        {#if dashboard}
            {#each dashboardItems as item}
                <NavbarItems name={item.name} url={item.href} />
            {/each}
            <form on:submit|preventDefault={handleLogout} class="ml-auto">
                <button type="submit" class="rounded bg-primary-500 p-2 text-surface-50"
                    >Logout</button
                >
            </form>
        {:else}
            {#each userItems as item}
                <NavbarItems name={item.name} url={item.href} />
            {/each}
        {/if}
    </ul>
</nav>
