import { NextRequest, NextResponse } from 'next/server'
import { CognitoIdentityProviderClient, AdminGetUserCommand } from '@aws-sdk/client-cognito-identity-provider'

// const cognitoClientId = '5s88dvfp61s33h0r50hutirv36'
const cognitoRegion = 'us-east-1'
const COGNITO_USER_POOL_ID = 'us-east-1_9QZbfNJmK'

export async function GET(req: NextRequest, res: NextResponse) {
  const info = new URL(req.url)

  const userId = info.searchParams.get('id') || ''

  const params = {
    UserPoolId: COGNITO_USER_POOL_ID,
    Username: userId, // required
  };
  
  const cognitoClient = new CognitoIdentityProviderClient({region: cognitoRegion})

  try {
    const command = new AdminGetUserCommand(params);
    const response = await cognitoClient.send(command)

    return new NextResponse(JSON.stringify({ user: response.UserAttributes }), {
      status: response['$metadata'].httpStatusCode,
    })

  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ error: err.toString() }, { status: err['$metadata'].httpStatusCode })
  }
}