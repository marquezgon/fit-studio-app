import { NextRequest, NextResponse } from 'next/server'
import { CognitoIdentityProviderClient, AdminUserGlobalSignOutCommand } from '@aws-sdk/client-cognito-identity-provider'
import { ISignInForm } from '@/app/types';

// const { COGNITO_REGION, COGNITO_APP_CLIENT_ID, COGNITO_USER_POOL_ID } = process.env
const COGNITO_APP_CLIENT_ID = '5s88dvfp61s33h0r50hutirv36'
const COGNITO_USER_POOL_ID = 'us-east-1_9QZbfNJmK'
const cognitoRegion = 'us-east-1'

export async function POST(req: NextRequest, res: NextResponse) {
  // const data: ISignInForm = await req.json();

  const cognitoClient = new CognitoIdentityProviderClient({region: cognitoRegion})
  
  const params = {
    ClientId: COGNITO_APP_CLIENT_ID,
    UserPoolId: COGNITO_USER_POOL_ID,
    Username: '+523313186670'
  }

  const adminInitiateAuthCommand = new AdminUserGlobalSignOutCommand(params)

  try {
    const response = await cognitoClient.send(adminInitiateAuthCommand)
    const serverResponse = NextResponse.json(
      {status: response['$metadata'].httpStatusCode}
    );

    return serverResponse
  } catch (err: any) {
      console.log(err)
      return NextResponse.json({ error: err.toString() }, { status: err['$metadata'].httpStatusCode })
  }
}