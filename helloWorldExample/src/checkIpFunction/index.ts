import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as http from 'typed-rest-client/HttpClient';
import { IpChecker } from 'crypto2cash-typescript-package-example';

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    const url = 'http://checkip.amazonaws.com/';
    let response;

    try {
        // http call example
        const httpClient: http.HttpClient = new http.HttpClient(undefined);
        const ipChecker = new IpChecker(httpClient);
        const ipAddress = await ipChecker.check();

        response = {
            statusCode: 200,
            body: JSON.stringify({
                ipAddress: ipAddress.trim(),
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

    return response;
};
