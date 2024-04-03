import { superValidate } from 'sveltekit-superforms/server';
import { contactFormSchema } from '$lib/formSchemas/contactFormSchema';
import { zod } from 'sveltekit-superforms/adapters';

const schema = contactFormSchema;

export const load = async () => {
    // Server API:
    const form = await superValidate(zod(schema));

    // Always return { form } in load and form actions.
    return { form };
};
