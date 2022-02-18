import { Injectable } from '@nestjs/common';
import { addHours, format } from 'date-fns';
import { s3Config } from 'src/config';
import { hmac } from '../utils';

const { accessKeyId, secretAccessKey, region, uploadBucketName } = s3Config;

@Injectable()
export class S3Service {
  public publicEndpoint() {
    // TODO: add production endpoint
    return `http://localhost:4569/${uploadBucketName}`;
  }

  /**
   * Constructs the form data to return to client to upload files.
   */
  public makeFormData(contentType: string, acl: string, key: string) {
    const credential = this.makeCredential();
    const longDate = format(new Date(), "yyyyMMdd'T'HHmmss'Z'");
    const policy = this.makePolicy(contentType, acl, longDate, credential);
    const signature = this.getSignature(policy);

    return {
      acl,
      key,
      policy,
      'Content-Type': contentType,
      'x-amz-algorithm': 'AWS4-HMAC-SHA256',
      'x-amz-credential': credential,
      'x-amz-date': longDate,
      'x-amz-signature': signature,
    };
  }

  private makeCredential() {
    return `${accessKeyId}/${format(
      new Date(),
      'yyyyMMddd',
    )}/${region}/s3/aws4_request`;
  }

  private makePolicy(
    contentType: string,
    acl: string,
    longDate: string,
    credential: string,
  ) {
    const tomorrow = addHours(new Date(), 24);
    const policy = {
      conditions: [
        { bucket: uploadBucketName },
        ['starts-with', '$key', ''],
        { acl },
        ['starts-with', '$Content-Type', contentType],
        ['starts-with', '$Cache-Control', ''],
        { 'x-amz-algorithm': 'AWS4-HMAC-SHA256' },
        { 'x-amz-credential': credential },
        { 'x-amz-date': longDate },
      ],
      expiration: format(tomorrow, "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    };

    return Buffer.from(JSON.stringify(policy)).toString('base64');
  }

  private getSignature(policy: string) {
    const kDate = hmac(
      `AWS4${secretAccessKey}`,
      format(new Date(), 'yyyyMMdd'),
    );
    const kRegion = hmac(kDate, region);
    const kService = hmac(kRegion, 's3');
    const kCredentials = hmac(kService, 'aws4_request');

    return hmac(kCredentials, policy, 'hex');
  }
}
