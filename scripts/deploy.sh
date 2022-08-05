echo "Processing deploy.sh"
# Set EB BUCKET as env variable
EB_BUCKET=elasticbeanstalk-us-west-1-346649815440
ZIP_FILE=gateway-prod-deploy.zip
ECR_URL=346649815440.dkr.ecr.us-west-1.amazonaws.com/gateway
# Set the default region for aws cli
aws configure set default.region us-west-1
# Set Access Key ID with Travis env var
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID 
# Set Secret Key with Travis env var
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
# Log in to ECR
eval $(aws ecr get-login --no-include-email --region us-west-1)
# Build docker image based on our production Dockerfile
docker build -t graphqlgate/gateway .
# tag the image with the Travis-CI SHA
docker tag graphqlgate/gateway:latest $ECR_URL:$TRAVIS_COMMIT
# Push built image to ECR
docker push $ECR_URL:$TRAVIS_COMMIT
# Use the linux sed command to replace the text '<VERSION>' in our Dockerrun file with the Travis-CI SHA key
sed -i='' "s/<VERSION>/$TRAVIS_COMMIT/" Dockerrun.aws.json
# Zip up our codebase, along with modified Dockerrun and our .ebextensions directory
zip -r $ZIP_FILE Dockerrun.aws.json .ebextensions
# Upload zip file to s3 bucket
aws s3 cp $ZIP_FILE s3://$EB_BUCKET/$ZIP_FILE
# Create a new application version with new Dockerrun
aws elasticbeanstalk create-application-version --application-name GraphQLGateway --version-label $TRAVIS_COMMIT --source-bundle S3Bucket=$EB_BUCKET,S3Key=$ZIP_FILE
# Update environment to use new version number.
aws elasticbeanstalk update-environment --environment-name gateway-prod --version-label $TRAVIS_COMMIT