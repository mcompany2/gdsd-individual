'use strict';
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./aws/secret/config.json');
var userData64 = new Buffer(`
  #!/bin/bash
  set -e -x
  sudo -i
  sudo yum install java-1.8.0 -y
  sudo yum remove java-1.7.0-openjdk -y
  curl --silent --location https://rpm.nodesource.com/setup_9.x | bash -
  curl --silent --location http://pkg.jenkins-ci.org/redhat-stable/jenkins.repo | sudo tee /etc/yum.repos.d/jenkins.repo
  sudo rpm --import https://jenkins-ci.org/redhat/jenkins-ci.org.key
  sudo yum install jenkins -y
  sudo service jenkins start
  sudo yum install -y git nodejs
  git clone https://github.com/AmmarHasan/gdsd-individual.git && cd gdsd-individual
  sudo npm install
  DEBUG=express:* node .
`).toString('base64');

var autoscaling = new AWS.AutoScaling();
var cloudwatch = new AWS.CloudWatch();
var loadBalancerName = 'loadBalancerSdk';

var launchConfiguration = {
  IamInstanceProfile: 'arn:aws:iam::002511670477:instance-profile/accessS3',
  ImageId: 'ami-0233214e13e500f77',
  InstanceType: 't2.micro',
  LaunchConfigurationName: 'sdk-launch-config',
  SecurityGroups: ['default'],
  UserData: userData64,
  KeyName: 'gdsd3',
};

var AutoScalingGroup = {
  AutoScalingGroupName: 'autoScalingSDK',
  AvailabilityZones: [
    'eu-central-1a',
  ],
  HealthCheckGracePeriod: 120,
  HealthCheckType: 'ELB',
  LaunchConfigurationName: 'sdk-launch-config',
  LoadBalancerNames: [
    loadBalancerName,
  ],
  MaxSize: 5,
  MinSize: 1,
};

var scaleOut = {
  AdjustmentType: 'ChangeInCapacity',
  AutoScalingGroupName: 'autoScalingSDK',
  PolicyName: 'ScaleOut',
  ScalingAdjustment: 2,
  Cooldown: 30,
};

var scaleIn = {
  AdjustmentType: 'ChangeInCapacity',
  AutoScalingGroupName: 'autoScalingSDK',
  PolicyName: 'ScaleIn',
  ScalingAdjustment: -2,
  Cooldown: 30,
};

var data1, data2;

function launchConfigurationCallBack(err, data) {
  if ((err && err.code === 'AlreadyExists') || !err) {
    console.log('LaunchConfiguration created successfully\n', data);           // successful response
    autoscaling.createAutoScalingGroup(
      AutoScalingGroup,
      AutoScalingGroupCreation
    );
  } else {
    console.log(err); // an error occurred
  }
}

function scaleOutPolicyCallBack(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    console.log('ScaleOut policy created successfully\n', data);           // successful response
    data1 = data.PolicyARN;

    var scaleOut = {
      AlarmName: 'ScaleOut', /* required */
      ComparisonOperator: 'GreaterThanOrEqualToThreshold', /* required */
      EvaluationPeriods: 1, /* required */
      MetricName: 'RequestCount', /* required */
      Namespace: 'AWS/ELB', /* required */
      Period: 60, /* required */
      Threshold: 7.0, /* required */
      AlarmDescription: 'This will be used to scale out',
      DatapointsToAlarm: 1,
      Dimensions: [
        {
          Name: 'LoadBalancerName', /* required */
          Value: loadBalancerName, /* required */
        },
        /* more items */
      ],
      AlarmActions: [data1],
      Statistic: 'Sum',
    };

    cloudwatch.putMetricAlarm(scaleOut, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log('Increase Instance alarm created successfully\n', data);           // successful response
    });
  }
}

function scaleInPolicyCallBack(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    console.log('ScaleIn policy created successfully\n', data);           // successful response
    data2 = data.PolicyARN;
    var scaleIn = {
      AlarmName: 'ScaleIn', /* required */
      ComparisonOperator: 'LessThanOrEqualToThreshold', /* required */
      EvaluationPeriods: 1, /* required */
      MetricName: 'RequestCount', /* required */
      Namespace: 'AWS/ELB', /* required */
      Period: 180, /* required */
      Threshold: 2.0, /* required */
      AlarmDescription: 'This will be used to scale in',
      DatapointsToAlarm: 1,
      Dimensions: [
        {
          Name: 'LoadBalancerName', /* required */
          Value: loadBalancerName, /* required */
        },
        /* more items */
      ],
      AlarmActions: [data2],
      Statistic: 'Minimum',
    };
    cloudwatch.putMetricAlarm(scaleIn, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log('Decrease Instance alarm created successfully\n', data);           // successful response
    });
  }
}

function AutoScalingGroupCreation(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    console.log('AutoScaling Group created successfully\n', data);           // successful response
    autoscaling.putScalingPolicy(scaleOut, scaleOutPolicyCallBack);
    autoscaling.putScalingPolicy(scaleIn, scaleInPolicyCallBack);
  }
}

autoscaling.createLaunchConfiguration(
  launchConfiguration,
  launchConfigurationCallBack
);


// // AMI is amzn-ami-2011.09.1.x86_64-ebs
// var instanceParams = {
//   ImageId: 'ami-0233214e13e500f77',
//   InstanceType: 't2.micro',
//   KeyName: 'qwiklabsAwsKey',
//   MinCount: 1,
//   MaxCount: 1,
//   UserData: userData64
// };

// // Create a promise on an EC2 service object
// var instancePromise = new AWS.EC2({apiVersion: '2016-11-15'}).runInstances(instanceParams).promise();

// // Handle promise's fulfilled/rejected states
// instancePromise.then(
//   function(data) {
//     console.log(data);
//     var instanceId = data.Instances[0].InstanceId;
//     console.log("Created instance", instanceId);
//     // Add tags to the instance
//     // tagParams = {Resources: [instanceId], Tags: [
//     //    {
//     //       Key: 'Name',
//     //       Value: 'SDK Sample'
//     //    }
//     // ]};
//     // Create a promise on an EC2 service object
//     var tagPromise = new AWS.EC2({apiVersion: '2016-11-15'}).createTags(tagParams).promise();
//     // Handle promise's fulfilled/rejected states
//     tagPromise.then(
//       function(data) {
//         console.log("Instance tagged");
//       }).catch(
//         function(err) {
//         console.error(err, err.stack);
//       });
//   }).catch(
//     function(err) {
//     console.error(err, err.stack);
//   });
