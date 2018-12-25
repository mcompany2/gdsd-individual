#/bin/bash

cd client
ng build --prod
aws s3 cp ./dist/youBuy s3://fd04.com --recursive --acl public-read
