import { type Handle, redirect } from '@sveltejs/kit';
import AuthController from '$lib/server/authCognito/controller/AuthController';

export const handle: Handle = async ({ event, resolve }) => {
    const cookies = event.cookies;
    const accessToken = cookies.get('accessToken');
    const refreshToken = cookies.get('refreshToken');
    const idToken = cookies.get('idToken');
    const authController = new AuthController();

    const checkLoginStatus = async () => {
        if (accessToken) {
            return await authController.validateSession(
                { accessToken },
                {
                    json: result => {
                        return { json: result };
                    },
                    status: status => {
                        return { json: error => console.error(error) };
                    },
                }
            );
        } else if (refreshToken) {
            return await authController.refreshToken(
                { refreshToken },
                {
                    json: result => {
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
                        return { json: result };
                    },
                    status: status => {
                        return { json: error => console.error(error) };
                    },
                }
            );
        }
        return { json: { error: 'no session' } };
    };

    const loginStatus = await checkLoginStatus();

    if (event.url.pathname.startsWith('/login')) {
        if (!loginStatus?.json.error) {
            throw redirect(303, '/dashboard');
        }
    }

    if (event.url.pathname.startsWith('/dashboard')) {
        if (loginStatus?.json.error) {
            throw redirect(303, '/login');
        }
    }

    if (event.url.pathname.endsWith('/logout')) {
        throw redirect(303, '/login');
    }

    const response: Promise<Response> | Response = await resolve(event);

    return response;
};
