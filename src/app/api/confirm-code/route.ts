import {NextRequest, NextResponse} from 'next/server'
import { CognitoIdentityProviderClient, ConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider'
import { IConfirmationCodeForm } from '@/app/types';

const COGNITO_APP_CLIENT_ID = '5s88dvfp61s33h0r50hutirv36'
const COGNITO_USER_POOL_ID = 'us-east-1_9QZbfNJmK'
const cognitoRegion = 'us-east-1'

export async function POST(req: NextRequest, res: NextResponse) {
  const data: IConfirmationCodeForm = await req.json();
  const username = data.phoneNumber.trim().split(' ').join('')
  const params = {
    ClientId: COGNITO_APP_CLIENT_ID,
    UserPoolId: COGNITO_USER_POOL_ID,
    ConfirmationCode: `${data.code}`,
    Username: username
  }


  const cognitoClient = new CognitoIdentityProviderClient({
    region: cognitoRegion
  })
  const adminInitiateAuthCommand = new ConfirmSignUpCommand(params)

  try {
    const response = await cognitoClient.send(adminInitiateAuthCommand)
    console.log(response)
    return new NextResponse(JSON.stringify({ answer: "Success" }), {
      status: response['$metadata'].httpStatusCode,
    });
  } catch (err: any) {
      return new NextResponse(JSON.stringify({ error: err.toString()}), {
        status: err['$metadata'].httpStatusCode
      });
  }
}