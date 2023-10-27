
import AWS from 'aws-sdk';

const configureS3Bucket = async () => {
    const accessKeyId = process.env.ACCESSKEYID;
    const secretAccessKey = process.env.SECRETACCESSKEY;

    if (!accessKeyId || !secretAccessKey) {
        throw 'AWS access key ID or secret access key is undefined.'
    }

    AWS.config.update({
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
        region: process.env.AWS_REGION,
    });

    const S3 = new AWS.S3();
return S3;
}
export{configureS3Bucket}