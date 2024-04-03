import { z } from 'zod';
import { contactFormSchema } from '$lib/formSchemas/contactFormSchema';

// Schema for the login form.
// The schema is used to validate the form input.
// The schema also has a default value for the form input.
// The default value is used to reset the form input.

export const loginFormSchema = z.object({
    email: contactFormSchema.shape.email,
    password: z
        .string()
        .trim()
        .min(8, 'Password must be at least 8 characters long')
        .max(32, 'Password must be at most 32 characters long')
        .regex(/^(?=.*[a-z]).+$/, 'Password must contain at least one lowercase letter')
        .regex(/^(?=.*[A-Z]).+$/, 'Password must contain at least one uppercase letter')
        .regex(
            /^(?=.*[!@#$%^&*()_+`\-={}|[\]\\:";'<>?,./]).+$/,
            'Password must contain at least one special character'
        ),
});
