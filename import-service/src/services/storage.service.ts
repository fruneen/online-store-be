import S3Client from 'aws-sdk/clients/s3';

const s3Client = new S3Client({ region: 'eu-central-1' });

export default s3Client;
