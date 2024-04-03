<script lang="ts">
    import type { PageData } from './$types';
    import { loginFormSchema } from '$lib/formSchemas/loginFormSchema';
    import { zod } from 'sveltekit-superforms/adapters';
    import { superForm } from 'sveltekit-superforms/client';
    import CustomInput from '$lib/components/input/CustomInput.svelte';

    export let data: PageData;

    const { form, constraints, errors, enhance } = superForm(data.form, {
        validators: zod(loginFormSchema),
    });
</script>

<div class="flex min-h-svh w-full items-center justify-center">
    <div class="h-full items-center justify-center">
        <div
            class="h-full w-screen max-w-xl rounded-xl border-2 border-tertiary-500 bg-surface-100 p-4 dark:bg-surface-600"
        >
            <div class="flex w-full flex-col items-center justify-center">
                <h1 class="font-sansita text-3xl font-bold text-surface-800 dark:text-surface-50">
                    Login
                </h1>
                <p class=" font-lato text-surface-300 dark:text-surface-400">
                    Please login to continue
                </p>
            </div>

            <form method="POST" use:enhance class="">
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    bind:value={$form.password}
                    error={$errors.password}
                    id="password"
                    params={$constraints.password}
                >
                    <label
                        class="my-2 inline-block font-lato text-surface-800 dark:text-surface-100"
                        slot="label"
                        for="password"
                    >
                        Password:
                    </label>
                </CustomInput>
                <button
                    type="submit"
                    class="mt-4 w-full rounded-md bg-primary-500 p-2 text-surface-50 hover:bg-primary-600 focus:outline-none"
                    >Login</button
                >
                <div class="mt-4 flex w-full flex-col items-center justify-center">
                    <a href="/login/forgotPassword" class="text-tertiary-600">Forgot Password?</a>
                </div>
            </form>
        </div>
    </div>
</div>
