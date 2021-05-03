const AWS = require("aws-sdk");
const uuid = require("uuid");

exports.uploadFileToAWS = async (base64File) => {
  const {
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    AWS_REGION,
    S3_BUCKET,
  } = process.env;

  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: AWS_REGION,
    params: {
      Bucket: S3_BUCKET,
    },
  });

  const buf = new Buffer.from(
    base64File.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = base64File.split(";")[0].split("/")[1];

  const data = {
    Key: uuid.v1(),
    Body: buf,
    ContentEncoding: "base64",
    ContentType: `image/${type}`,
  };
  const f = await s3.putObject(data, function (err, data) {
    if (err) {
      console.log(err);
      console.log("Error uploading data: ", data);
    } else {
      console.log("successfully uploaded the image!");
    }
  });
  return f;
};
