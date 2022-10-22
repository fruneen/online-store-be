import SQSClient from 'aws-sdk/clients/sqs';

const sqsClient = new SQSClient({ region: 'eu-central-1' });

export default sqsClient;
