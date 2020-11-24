import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Greeter } from 'crypto2cash-typescript-package-example';

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    let response;
    const greeter = new Greeter();

    try {
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: greeter.greet('World'),
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
