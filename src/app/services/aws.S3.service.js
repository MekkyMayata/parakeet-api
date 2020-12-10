import AWS from 'aws-sdk';
import crypto from 'crypto';
import credentials from '../../config';



class AwsS3Service {
  constructor() {
    AWS.config = new AWS.Config({
      accessKeyId: credentials.AWS_S3_KEY,
      secretAccessKey: credentials.AWS_S3_SECRET,
      region: credentials.AWS_S3_BUCKET_REGION
    });
    // Create S3 service object
    this.s3 = new AWS.S3();
    this.region = credentials.AWS_S3_BUCKET_REGION;
    this.bucket = credentials.AWS_S3_BUCKET_NAME;
  }

  static async generatePutUrl(Key, ContentType) {
    try {
      Key = 'post' + crypto.randomBytes(16).toString('hex') + Key;

      const params = {
        Bucket: this.bucket,
        Key,
        ContentType,
        ACL: 'bucket-owner-full-control'
      };
      const signedUrl = await this.s3.getSignedUrlPromise('putObject', params);

      return {
        success: true,
        url: signedUrl,
        name: Key
      };
    } catch (err) {
        return {
          success: false,
          message: err.message
        };
    }
  }

  static async generateGetUrl(Key) {
    try {
      const params = {
        Bucket: this.bucket,
        Key,
        Expires: 120
      };
      const signedUrl = await this.s3.getSignedUrlPromise('getObject', params);
      return {
        success: true,
        url: signedUrl
      };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

  static async getPublicUrl(Key) {
    return `https://${this.bucket}.s3.us-east-2.amazonaws.com/` + Key;
  }

  static async removePublicUrl(url) {
    return url.replace(`https://${this.bucket}.s3.us-east-2.amazonaws.com/`, "");
  }
  
}

export default AwsS3Service;