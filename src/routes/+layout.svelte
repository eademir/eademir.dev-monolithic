<script lang="ts">
    import { onMount } from 'svelte';
    import '../app.css';
    import InvertModeOutline from 'svelte-ionicons/InvertModeOutline.svelte';

    let darkTheme: boolean = false;
    function toggle() {
        localStorage.theme = localStorage.theme === 'dark' ? '' : 'dark';
        darkTheme = !darkTheme;
        setTheme();
    }
    function setTheme() {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
            darkTheme = true;
        } else {
            document.documentElement.classList.remove('dark');
            darkTheme = false;
        }
    }

    onMount(() => {
        setTheme();
    });
</script>

<div
    class="min-h-svh w-full bg-gradient-to-bl from-secondary-100 via-surface-50 to-primary-100 dark:bg-gradient-to-bl dark:from-secondary-900 dark:via-surface-900 dark:to-primary-900"
>
    <button
        on:click={toggle}
        class="absolute right-1 top-1 z-20 rounded bg-surface-800 p-2 transition-colors duration-200 ease-in-out dark:bg-surface-200"
    >
        <InvertModeOutline
            class="h-6 w-6 text-surface-200 transition-colors dark:text-surface-800"
        />
    </button>
    <slot />
</div>
