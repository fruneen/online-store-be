import { APIGatewayRequestIAMAuthorizerHandlerV2 } from 'aws-lambda';

import { generatePolicy } from 'helpers/generatePolicy';

const basicAuthorizer: APIGatewayRequestIAMAuthorizerHandlerV2 = (event, context, callback) => {
  console.log('Event: ', JSON.stringify(event));

  const { identitySource, routeArn } = event;

  if (!identitySource) {
    callback('Unauthorized');
  }

  try {
    const [authorizationToken] = identitySource;

    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    console.log(buff);
    const plainCreds = buff.toString('utf-8').split(':');

    const [username, password] = plainCreds;
    console.log(`Username: ${username}, password: ${password}`);

    console.log(process.env);

    const storedUserPassword = process.env[username];

    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';
    const policy = generatePolicy(encodedCreds, routeArn, effect);
    callback(null, policy);
  } catch (error) {
    console.log('Error: ', error);
    callback('Unauthorized');
  }
};

export default basicAuthorizer;
