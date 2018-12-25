'use strict';
// AWS_ACCESS_ID=AKIAJ3OFCE343F6VYCFA AWS_SECRET_ACCESS_KEY=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 nodemon .
const AWS = require('aws-sdk');
const config = require('./../config');

const s3 = new AWS.S3({
  region: config.REGION,
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());

  router.post('/api/imageUpload', (req, res) => {
    const params = {
      Bucket: config.Bucket,
      Key: req.files[0].originalname,
      Body: req.files[0].buffer,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error -> ' + err);
        return;
      }

      res.json({
        location: data.Location,
        name: req.files[0].originalname,
        size: req.files[0].size,
      });
    });
  });

  server.use(router);
};
