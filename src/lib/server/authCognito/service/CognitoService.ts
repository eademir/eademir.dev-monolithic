import { AuthFlowType, CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { awsConfig, userPoolId } from '../config/aws.config';
import { env } from '$env/dynamic/private';

export default class Cognito {
    private cognito: CognitoIdentityProvider;

    constructor() {
        this.cognito = new CognitoIdentityProvider(awsConfig);
    }

    async login(username: any, password: any) {
        const params = {
            AuthFlow: 'ADMIN_USER_PASSWORD_AUTH' as AuthFlowType,
            ClientId: env.AWS_CLIENT_ID,
            UserPoolId: userPoolId,
            AuthParameters: {
                EMAIL: username,
                USERNAME: username,
                PASSWORD: password,
            },
        };
        try {
            return await this.cognito.adminInitiateAuth(params);
        } catch (error) {
            return error;
        }
    }

    async respondToAuthChallenge(username: string, session: string, newPassword: string) {
        const params = {
            ChallengeName: 'NEW_PASSWORD_REQUIRED' as 'NEW_PASSWORD_REQUIRED',
            ClientId: env.AWS_CLIENT_ID,
            UserPoolId: userPoolId,
            ChallengeResponses: {
                NEW_PASSWORD: newPassword,
                EMAIL: username,
                USERNAME: username,
                // 'userAttributes.name': username,
                // 'userAttributes.family_name': '',
                // 'userAttributes.website': '',
                // 'userAttributes.profile': '',
                // 'userAttributes.picture': '',
                // 'userAttributes.nickname': '',
                // 'userAttributes.phone_number': '',
            },
            Session: session,
        };
        try {
            return await this.cognito.adminRespondToAuthChallenge(params);
        } catch (error) {
            return error;
        }
    }

    async smsMfa(username: string, session: string, code: string) {
        const params = {
            ChallengeName: 'SMS_MFA' as 'SMS_MFA',
            ClientId: env.AWS_CLIENT_ID,
            UserPoolId: userPoolId,
            ChallengeResponses: {
                USERNAME: username,
                SMS_MFA_CODE: code,
            },
            Session: session,
        };
        try {
            return this.cognito.adminRespondToAuthChallenge(params);
        } catch (error) {
            return error;
        }
    }

    async updateAttributes(username: string, session: string, attributes: any) {
        const params = {
            UserAttributes: attributes,
            UserPoolId: userPoolId,
            Session: session,
            Username: username,
        };
        try {
            return await this.cognito.adminUpdateUserAttributes(params);
        } catch (error) {
            return error;
        }
    }

    async forgotPassword(username: string) {
        const params = {
            ClientId: env.AWS_CLIENT_ID,
            Username: username,
        };
        try {
            return await this.cognito.forgotPassword(params);
        } catch (error) {
            return error;
        }
    }

    // validate user session id
    async validateSession(accessToken: { AccessToken: string }) {
        try {
            return await this.cognito.getUser(accessToken);
        } catch (error) {
            return error;
        }
    }

    // refresh user session id
    async refreshToken(refreshToken: string) {
        const params = {
            AuthFlow: 'REFRESH_TOKEN_AUTH' as AuthFlowType,
            ClientId: env.AWS_CLIENT_ID,
            AuthParameters: {
                REFRESH_TOKEN: refreshToken,
            },
        };
        try {
            return await this.cognito.initiateAuth(params);
        } catch (error) {
            return error;
        }
    }

    async signOut(accessToken: string | undefined) {
        const params = {
            AccessToken: accessToken,
        };
        try {
            return await this.cognito.globalSignOut(params);
        } catch (error) {
            return error;
        }
    }
}
