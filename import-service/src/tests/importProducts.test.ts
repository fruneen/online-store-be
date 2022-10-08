import * as handler from '../../handler';
import s3Client from 'services/storage.service';

describe('Upload file to S3', () => {
  it('Get signed URL and upload file', async () => {
    const name = 'test-import-products.csv';

    const response = await handler.importProductsFile({ queryStringParameters: { name } });
    const { signedUrl } = JSON.parse(response.body);

    expect(signedUrl).toBeDefined();

    const uploadResponse = await s3Client.upload({
      Bucket: 'node-in-aws-import-service',
      Key: `uploaded/${name}`,
      Body: Buffer.from('test'),
    }).promise();

    expect(uploadResponse.ETag).toBeDefined();

    await s3Client.deleteObject({
      Bucket: 'node-in-aws-import-service',
      Key: `uploaded/${name}`,
    }).promise();
  });

  it('Get signed URL and upload file without name', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response = await handler.importProductsFile({ queryStringParameters: {} });
    const { error } = JSON.parse(response.body);

    expect(error).toBe('Name is required');
  });
});
