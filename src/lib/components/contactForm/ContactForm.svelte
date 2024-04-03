<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import CustomInput from '$lib/components/input/CustomInput.svelte';
    import CustomButton from '$lib/components/button/CustomButton.svelte';
    import CustomTextArea from '$lib/components/textarea/CustomTextArea.svelte';
    import type { PageData } from '../../../routes/(unauthenicated)/$types';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
    import { contactFormSchema } from '$lib/formSchemas/contactFormSchema';
    import { zod } from 'sveltekit-superforms/adapters';

    // icons
    import CheckmarkCircleOutline from 'svelte-ionicons/CheckmarkCircleOutline.svelte';
    import EllipseOutline from 'svelte-ionicons/EllipseOutline.svelte';

    export let data: PageData;

    const { form, constraints, enhance, errors, reset } = superForm(data.form, {
        validators: zod(contactFormSchema),
        taintedMessage: () => {
            return new Promise(resolve => {
                const answer = confirm('You have unsaved changes. Are you sure you want to leave?');
                resolve(answer);
                if (answer) reset();
            });
        },
        validationMethod: 'oninput',
    });

    // Add a function to toggle the terms
    function toggleTerms() {
        $form.terms = !$form.terms;
    }
</script>

<div class="h-full overflow-y-auto p-4">
    <h3 class="mb-4 w-full text-center font-sansita text-2xl font-bold">Contact Me</h3>
    <form method="POST" use:enhance class="flex flex-col">
        <CustomInput
            type="text"
            name="fullName"
            placeholder="Full name"
            bind:value={$form.fullName}
            error={$errors.fullName}
            id="fullName"
            params={$constraints.fullName}
        >
            <label
                class="my-2 inline-block font-lato text-surface-800 dark:text-surface-100"
                slot="label"
                for="fullName"
            >
                Full name:
            </label>
        </CustomInput>
        <CustomInput
            type="email"
            name="email"
            placeholder="Email"
            bind:value={$form.email}
            error={$errors.email}
            id="email"
            params={$constraints.email}
        >
            <label
                class="my-2 inline-block font-lato text-surface-800 dark:text-surface-100"
                slot="label"
                for="email"
            >
                Email:
            </label>
        </CustomInput>
        <CustomInput
            type="text"
            name="subject"
            placeholder="Subject"
            bind:value={$form.subject}
            error={$errors.subject}
            id="subject"
            params={$constraints.subject}
        >
            <label
                class="my-2 inline-block font-lato text-surface-800 dark:text-surface-100"
                slot="label"
                for="subject"
            >
                Subject:
            </label>
        </CustomInput>
        <CustomTextArea
            placeholder="Message"
            name="message"
            bind:value={$form.message}
            error={$errors.message}
            params={$constraints.message}
        >
            <label
                class="my-2 inline-block font-lato text-surface-800 dark:text-surface-100"
                slot="label"
                for="message"
            >
                Message:
            </label>
        </CustomTextArea>
        <button class="flex items-center gap-2" on:click={toggleTerms} type="button">
            {#if $form.terms}
                <CheckmarkCircleOutline class="h-6 w-6 text-tertiary-500" />
            {:else}
                <EllipseOutline class="h-6 w-6 text-surface-800 dark:text-surface-200" />
            {/if}
            <span class="font-12 font-lato font-light text-surface-800 dark:text-surface-200">
                I agree to the <a class="text-tertiary-500 underline" href="/terms-and-conditions"
                    >terms and conditions</a
                >
            </span>
        </button>
        {#if !!$errors.terms}
            <p class="text-xs italic text-error-400">{$errors.terms}</p>
        {/if}
        <div class="my-4 text-center">
            <div class="relative flex h-7 w-full justify-center">
                <hr class="absolute top-3 w-full bg-surface-800 dark:bg-surface-200" />
                <span
                    class="absolute h-5 bg-surface-100 px-4 font-sansita font-bold text-surface-800 dark:bg-surface-800 dark:text-surface-100"
                    >OR</span
                >
            </div>
            <a class="m-2 p-2 font-lato" href="mailto:me@eademir.dev">Mail to me@eademir.dev</a>
        </div>
        <div>
            <CustomButton type="submit" colour="bg-tertiary-500 hover:bg-tertiary-600" />
        </div>
    </form>
</div>

<SuperDebug data={$form} />
