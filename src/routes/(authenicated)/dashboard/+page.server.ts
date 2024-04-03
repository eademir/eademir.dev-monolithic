import type { Actions } from './$types';
import AuthController from '$lib/server/authCognito/controller/AuthController';
import { redirect } from '@sveltejs/kit';

export const load = async ({ request, cookies }) => {
    // Server API:
};

export const actions = {
    logout: async ({ cookies }) => {
        const accessToken = cookies.get('accessToken') || '';

        const authController = new AuthController();
        await authController.signOut(
            { accessToken },
            {
                json: result => {
                    if (result['$metadata'].httpStatusCode === 200) {
                        cookies.set('accessToken', '', { path: '/', maxAge: -1 });
                        cookies.set('refreshToken', '', { path: '/', maxAge: -1 });
                        cookies.set('idToken', '', { path: '/', maxAge: -1 });
                    }
                },
                status: status => {
                    return {
                        json: error => {
                            console.warn(error, status);
                        },
                    };
                },
            }
        );
    },
} as Actions;
