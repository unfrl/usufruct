const accessKeyId = process.env.S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;
const uploadBucketName = process.env.S3_UPLOAD_BUCKET_NAME;

export const s3Config = {
  accessKeyId,
  secretAccessKey,
  region,
  uploadBucketName,
};
