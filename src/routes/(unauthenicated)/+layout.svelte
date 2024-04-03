<script lang="ts">
    import type { PageData } from './$types';
    import ContactForm from '$lib/components/contactForm/ContactForm.svelte';
    import AboutMe from '$lib/components/aboutMe/AboutMe.svelte';
    import { fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import MailOutline from 'svelte-ionicons/MailOutline.svelte'; // Added icon like this to increase the compile time
    import { onDestroy, onMount } from 'svelte';
    import CloseCircleOutline from 'svelte-ionicons/CloseCircleOutline.svelte'; // Added icon like this to increase the compile time

    export let data: PageData;

    // used to handle the sidebars
    let showContactForm = false;
    let showAboutMe = false;
    let innerWidth = 0;

    const handleContactForm = () => {
        if (innerWidth > 1440) {
            showContactForm = true;
        } else {
            showContactForm = true;
            showAboutMe = false;
        }
    };

    // used to close the contact form when the close button is clicked
    const closeContactForm = () => {
        showContactForm = false;
    };

    // used to open the about me and contact section
    const handleAboutMe = () => {
        if (innerWidth > 1440) {
            showAboutMe = true;
        } else {
            showAboutMe = true;
            showContactForm = false;
        }
    };

    const closeAboutMe = () => {
        showAboutMe = false;
    };

    // used for handling the sidebars
    // connected to the window resize event via svelte:window
    const handleSideBars = () => {
        // setTimeout is used to prevent the transition from being janky
        setTimeout(() => {
            if (innerWidth > 1440) {
                showContactForm = true;
                showAboutMe = true;
            } else if (innerWidth > 1024) {
                showContactForm = true;
                showAboutMe = false;
            } else {
                showContactForm = false;
                showAboutMe = false;
            }
        }, 500);
    };

    // onMount and onDestroy are used to handle the sidebars on the initial load and when the component is destroyed
    onMount(() => handleSideBars());
    onDestroy(() => handleSideBars());
</script>

<svelte:window on:resize={handleSideBars} bind:innerWidth />

<div class="text-dark dark:text-light w-full">
    <div class="h-svh w-full overflow-hidden">
        <div class="flex w-full items-center">
            {#if showContactForm}
                <div
                    class="fixed flex h-screen w-full items-center overflow-hidden p-4 lg:relative lg:max-w-sm"
                    transition:fly={{ x: -300, duration: 300, easing: quintOut }}
                >
                    <div
                        class="flex max-h-full w-full flex-col rounded-xl border border-tertiary-500 bg-surface-100 p-2 text-surface-800 md:p-4 lg:max-w-sm dark:bg-surface-800 dark:text-surface-100"
                    >
                        <button
                            class="absolute overflow-hidden rounded-full bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-100"
                            on:click={closeContactForm}
                        >
                            <CloseCircleOutline class="h-8 w-8" />
                        </button>
                        <ContactForm {data} />
                    </div>
                </div>
            {/if}
            <div class="h-screen w-full p-4">
                <div
                    class="mx-auto flex h-full w-full max-w-7xl flex-col rounded-xl border border-tertiary-500 bg-surface-100 p-2 text-surface-800 md:p-4 dark:bg-surface-800 dark:text-surface-100"
                >
                    <slot />
                </div>
            </div>
            {#if showAboutMe}
                <div
                    class="fixed flex h-screen w-full items-center overflow-hidden p-4 lg:relative lg:max-w-sm"
                    transition:fly={{ x: 300, duration: 300, easing: quintOut }}
                >
                    <div
                        class="flex max-h-full w-full flex-col rounded-xl border border-tertiary-500 bg-surface-100 p-2 text-surface-800 md:p-4 lg:max-w-sm dark:bg-surface-800 dark:text-surface-100"
                    >
                        <button
                            class="absolute overflow-hidden rounded-full bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-100"
                            on:click={closeAboutMe}
                        >
                            <CloseCircleOutline class="h-8 w-8" />
                        </button>
                        <AboutMe />
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

{#if !showContactForm}
    <button
        class="fixed bottom-16 left-[-32px] z-50 rounded-full bg-primary-500 p-1 text-surface-100 transition-all hover:left-1 dark:bg-surface-200 dark:text-surface-900"
        on:click={handleContactForm}
        transition:fly={{ x: -300, duration: 300, easing: quintOut }}
    >
        <MailOutline class="h-12 w-12" />
    </button>
{/if}

{#if !showAboutMe}
    <button
        class="fixed bottom-16 right-[-32px] z-50 rounded-full bg-primary-500 text-surface-100 transition-all hover:right-1 dark:bg-primary-400 dark:text-surface-900"
        on:click={handleAboutMe}
        transition:fly={{ x: 300, duration: 300, easing: quintOut }}
    >
        <img src="/profile.webp" alt="" class="h-16 w-16 rounded-full" />
    </button>
{/if}
