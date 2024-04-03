import Cognito from '../service/CognitoService.js';
import type { AuthFlowType } from '@aws-sdk/client-cognito-identity-provider';
import { env } from '$env/dynamic/private';

interface CognitoResult {
    ChallengeName: string;
    Session: string;
}

export default class AuthController {
    private cognito: Cognito;
    constructor() {
        this.cognito = new Cognito();
    }

    //sign in
    async signIn(
        req: { body: { username: any; password: any; newPassword: any } },
        res: {
            json: (result: any) => void;
            status: (status: any) => { json: (error: any) => void };
        }
    ) {
        try {
            const { username, password, newPassword } = req.body;
            const result: CognitoResult = (await this.cognito.login(
                username,
                password
            )) as CognitoResult;
            if (result.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
                await this.handleNewPasswordRequired(username, result.Session, newPassword, res);
            } else if (result.ChallengeName === 'SMS_MFS') {
                await this.handleSmsMfa(username, result.Session, newPassword, res);
            } else {
                res.json(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'internal server error' });
        }
    }

    // forgot password
    async forgotPassword(
        req: { body: { username: any } },
        res: {
            json: (result: any) => void;
            status: (status: any) => { json: (error: any) => void };
        }
    ) {
        try {
            const { username } = req.body;
            const result = await this.cognito.forgotPassword(username);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'internal server error' });
        }
    }

    // validate session id
    async validateSession(
        req: { accessToken: string },
        res: {
            json: (result: any) => void;
            status: (status: any) => { json: (error: any) => void };
        }
    ) {
        try {
            const params = {
                AccessToken: req.accessToken,
            };

            const result = await this.cognito.validateSession(params);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'internal server error' });
        }
    }

    async handleNewPasswordRequired(
        username: string,
        session: string,
        newPassword: string,
        res: {
            json: (result: any) => void;
            status: (status: any) => { json: (error: any) => void };
        }
    ) {
        try {
            const result = await this.cognito.respondToAuthChallenge(
                username,
                session,
                newPassword
            );
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'internal server error' });
        }
    }

    async handleSmsMfa(
        username: string,
        session: string,
        code: string,
        res: {
            json: (result: any) => void;
            status: (status: any) => { json: (error: any) => void };
        }
    ) {
        try {
            const result = await this.cognito.smsMfa(username, session, code);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'internal server error' });
        }
    }

    async handleUpdateAttributes(
        username: string,
        session: string,
        attributes: any,
        res: {
            json: (result: any) => void;
            status: (status: any) => { json: (error: any) => void };
        }
    ) {
        try {
            const result = await this.cognito.updateAttributes(username, session, attributes);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'internal server error' });
        }
    }

    async refreshToken(
        req: { refreshToken: string },
        res: {
            json: (result: any) => void;
            status: (status: any) => { json: (error: any) => void };
        }
    ) {
        try {
            const result = await this.cognito.refreshToken(req.refreshToken);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'internal server error' });
        }
    }

    async signOut(
        req: { accessToken: string | undefined },
        res: {
            json: (result: any) => void;
            status: (status: any) => { json: (error: any) => void };
        }
    ) {
        try {
            const result = await this.cognito.signOut(req.accessToken);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'internal server error' });
        }
    }
}
