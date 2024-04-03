import type { CognitoIdentityProviderClientConfig } from '@aws-sdk/client-cognito-identity-provider';
import { env } from '$env/dynamic/private';
export const awsConfig: CognitoIdentityProviderClientConfig = {
    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY || '',
    },
};

// export const middlewareconfig = {
//     region: env.AWS_REGION,
//     userPoolId: env.USER_POOL_ID_DEV,
//     tokenUse: ['id', 'access'],
//     //audience: [env.USER_POOL_APP_CLIENT_ID_DEV], // (optional) the AWS Cognito User Pool App Client ID
// };
//
//process.env.USER_POOL_ID_DEV;
export const userPoolId = env.USER_POOL_ID_DEV;
//process.env.USER_POOL_ID_PROD;
