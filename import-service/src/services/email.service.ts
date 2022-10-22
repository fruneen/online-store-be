import SNSClient from 'aws-sdk/clients/sns';

const snsClient = new SNSClient({ region: 'eu-central-1' });

export default snsClient;
