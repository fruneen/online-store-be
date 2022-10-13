import createResponse from 'helpers/createResponse';
import s3Client from 'services/storage.service';

const importProductsFile = async (event: { queryStringParameters: { name: string }; }) => {
  try {
    if (!event.queryStringParameters || !event.queryStringParameters.name) {
      return createResponse(400, { error: 'Name is required' });
    }

    const { name } = event.queryStringParameters;

    const signedUrl = await s3Client.getSignedUrlPromise('putObject', {
      Bucket: 'node-in-aws-import-service',
      Key: `uploaded/${name}`,
      Expires: 60,
      ContentType: 'text/csv',
    });

    return createResponse(200, { signedUrl });
  } catch (error) {
    console.log(error);
    return createResponse(500, error);
  }
};

export default importProductsFile;
