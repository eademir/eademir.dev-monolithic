import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { loginFormSchema } from '$lib/formSchemas/loginFormSchema';
import type { Actions } from './$types';
import AuthController from '$lib/server/authCognito/controller/AuthController';
import S3Service from '$lib/server/bucketS3/service/S3Service';

const schema = loginFormSchema;

export const load = async () => {
    // Server API:
    const form = await superValidate(zod(schema));
    const login = false;
    // Always return { form } in load and form actions.
    const s3 = new S3Service();
    return { form, login };
};

export const actions = {
    default: async ({ request, cookies }) => {
        const form = await superValidate(zod(schema));
        // Server API:
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        const authController = new AuthController();
        await authController.signIn(
            { body: { username: email, password: password, newPassword: '' } },
            {
                json: result => {
                    cookies.set('refreshToken', result.AuthenticationResult.RefreshToken, {
                        maxAge: 60 * 60 * 24 * 30,
                        path: '/',
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                    });
                    cookies.set('accessToken', result.AuthenticationResult.AccessToken, {
                        maxAge: result.AuthenticationResult.ExpiresIn,
                        path: '/',
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                    });
                    cookies.set('idToken', result.AuthenticationResult.IdToken, {
                        maxAge: result.AuthenticationResult.ExpiresIn,
                        path: '/',
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                    });
                },
                status: status => {
                    return {
                        json: error => {
                            console.log(error);
                        },
                    };
                },
            }
        );

        return { form };
    },
} as Actions;
