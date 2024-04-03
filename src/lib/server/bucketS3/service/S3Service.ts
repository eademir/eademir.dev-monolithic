import { S3Client } from '@aws-sdk/client-s3';
import { env } from '$env/dynamic/private';
import { s3Config } from '$lib/server/bucketS3/config/s3.config';

export default class S3Service {
    private s3: S3Client;

    constructor() {
        this.s3 = new S3Client(s3Config);
    }
}
