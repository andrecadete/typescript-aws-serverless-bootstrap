import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    let response;
    try {
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    } catch (err) {
        console.error(err);
        response = {
            statusCode: 500,
            body: JSON.stringify(
                {
                    error: err.message
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    return response
};
