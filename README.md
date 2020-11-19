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

You can deploy the usual SAM CLI way:  
`sam deploy --s3-bucket BUCKET_NAME --stack-name STACK_NAME --profile AWS_PROFILE --region AWS_REGION`  
Where BUCKET_NAME is the bucket you wish to store the packaged stack in and STACK_NAME is the CloudFormation unique stack name.  
For more deployment flags like setting CloudFormation parameters with `--parameter-overrides` please refer to the [official AWS Docs relevant section](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-deploy.html).
