import { z } from 'zod';

// Schema for the contact form.
// The schema is used to validate the form input.
// The schema also has a default value for the form input.
// The default value is used to reset the form input.

export const contactFormSchema = z.object({
    fullName: z.string().trim().min(5, 'Full name must be at least 5 characters long'),
    email: z.string().email().trim().min(1, 'Email is required'),
    message: z.string().trim().min(10, 'Message must be at least 10 characters long'),
    subject: z.string().trim().min(5, 'Subject must be at least 5 characters long'),
    terms: z
        .boolean()
        .default(false)
        .refine(value => value === true, { message: 'You must agree to the terms and conditions' }),
});
