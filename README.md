# AWS Serverless typescript boostrap


This project contains an example of a multi-function typescript AWS serverless stack. <br />
It uses Webpack to go around the multiple issues presented when trying to use SAM CLI 
to build Typescript based lambda function stacks.

### Try it
- Navigate to the main stack folder:  
`cd helloWorldExample`
- Install dependencies:  
`npm install`
- Build the project:  
`npm run build`
- Run it in your preferred way:

    - Execute a single function 
    using the function Logical Id (defined in template.yaml) 
    and optionally pass the event flag pointing to your preferred event json file.  
    Examples:  
    
        `sam local invoke HelloWorldFunction`  
        
        `sam local invoke CheckIpFunction --event events/event.json`

    - Run the stack's API and call each endpoint in your own preferred way
        - `sam local start-api`
        - Open your preferred browser using the URL provided in the previous command's output, usually `http://127.0.0.1:3000`.  
        
            Examples:  
            
            `http://127.0.0.1:3000/hello`
            `http://127.0.0.1:3000/checkIp`
            

### Deploy it

#### Manually

You can manually deploy the usual SAM CLI way:  
`sam deploy --s3-bucket BUCKET_NAME --stack-name STACK_NAME --profile AWS_PROFILE --region AWS_REGION --capabilities CAPABILITY_IAM --confirm-changeset`  
Where BUCKET_NAME is the bucket you wish to store the packaged stack in and STACK_NAME is the CloudFormation unique stack name.  
For more deployment flags like setting CloudFormation parameters with `--parameter-overrides` please refer to the [official AWS Docs relevant section](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-deploy.html).


#### Automatically

You can setup a pipeline in CodePipelines.
    - Source step: to use this repository as source you'll probably have to use Custom Source Actions in CodePipelines. If you prefer to use Github "(Version 1)"/"(Version 2)" as Source, feel free to fork this repository into your own github account.
    - Build step: You can use the provided buildspec.yml in the stack folder (helloWorldExample/) and edit it as you wish. All it does is install npm dependencies, run `npm run build` and package it to S3 using SAM CLI. You need to pass the environment variable ARTIFACT_S3_BUCKET from CodePipelines to codebuild (or directly in CodeBuild) and ensure the Service Role used for CodeBuild has permissions to store the artifacts in that bucket.
    - Deploy step: You can simply use the exported artifact and deploy it using Cloudformation integration in CodePipelines. You must ensure the Role passed from CodePipelines to CloudFormation has enough permissions to deploy the Lambda functions and API Gateway (or any other services you add to the stack).

### Notes
- For CORS, a basic configuration is present in the example template.  
  This is not enough for Lambda Proxy integrations (default) as Proxy integration responses can't be changed on Gateway level.
  It will merely add the OPTIONS requests for those endpoints.  
  For headers that you want to see returned by the main methods (GET, POST, etc), you need to make sure the lambda function adds it in it's response.  
  Example:  
    ```
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
    ```
