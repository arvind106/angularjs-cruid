const config = require("./config");
const AWS = require('aws-sdk');
let s3Options ={
	accessKeyId: config.S3_ACCESS_KEY_ID,
    secretAccessKey: config.S3_SECRET_ACCESS_KEY,
    region:config.S3_REGION	
};
AWS.config.update(s3Options);
var s3 = new AWS.S3();

module.exports = s3;