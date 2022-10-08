import csv  from 'csv-parser';
import { S3Event } from 'aws-lambda';

import createResponse from 'helpers/createResponse';
import s3Client from 'services/storage.service';

const importFileParser = async (event: S3Event) => {
  try {
    const records = event.Records
      .filter(record => record.s3.object.size)
      .map((record) => record.s3);

    for (const record of records) {
      console.log(`Processing file ${record.object.key}`);

      const bucket = record.bucket.name;
      const key = record.object.key;
      const fileName = key.split('/').pop();

      const s3Stream = s3Client.getObject({
        Bucket: bucket,
        Key: key,
      }).createReadStream().pipe(csv());

      const readFile = () => new Promise<void>(function (resolve, reject) {
        s3Stream
          .on('error', () => {
            console.log('Error reading file');
            reject();
          })
          .on('data', (data) => {
            console.log(data);
          })
          .on('end', () => {
            console.log(`Finished processing file ${record.object.key}`);
            resolve();
          });
      });

      await readFile();

      await s3Client.copyObject({
        Bucket: bucket,
        CopySource:  `${bucket}/${key}`,
        Key: `parsed/${fileName}`,
      }).promise();

      await s3Client.deleteObject({
        Bucket: bucket,
        Key: key,
      }).promise();

    }
  } catch (error) {
    console.log(error);
    return createResponse(500, error);
  }
};

export default importFileParser;
