const AWS = require("aws-sdk");
const uuid = require("uuid");

exports.uploadFileToAWS = async (base64File) => {
  if (base64File === "" || !base64File) {
    return null;
  }

  const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, S3_BUCKET } = process.env;

  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const buf = new Buffer.from(
    base64File.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = base64File.split(";")[0].split("/")[1];

  const params = {
    Bucket: S3_BUCKET,
    Key: uuid.v1() + `.${type}`,
    Body: buf,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, function (err, data) {
      if (err) {
        resolve(null);
      } else {
        console.log("data location:", data.Location);
        resolve(data.Location);
      }
    });
  });
};
