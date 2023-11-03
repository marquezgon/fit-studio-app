import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { CognitoIdentityProviderClient, AdminInitiateAuthCommand, AuthFlowType } from '@aws-sdk/client-cognito-identity-provider'
import { ISignInForm } from '@/app/types';

// const { COGNITO_REGION, COGNITO_APP_CLIENT_ID, COGNITO_USER_POOL_ID } = process.env
const COGNITO_APP_CLIENT_ID = '5s88dvfp61s33h0r50hutirv36'
const COGNITO_USER_POOL_ID = 'us-east-1_9QZbfNJmK'
const cognitoRegion = 'us-east-1'

export async function POST(req: NextRequest, res: NextResponse) {
  const data: ISignInForm = await req.json();
  
  const params = {
    AuthFlow: AuthFlowType.ADMIN_USER_PASSWORD_AUTH,
    ClientId: COGNITO_APP_CLIENT_ID,
    UserPoolId: COGNITO_USER_POOL_ID,
    AuthParameters: {
      USERNAME: data.phoneNumber,
      PASSWORD: data.password
    }
  }

  const cognitoClient = new CognitoIdentityProviderClient({region: cognitoRegion})
  const adminInitiateAuthCommand = new AdminInitiateAuthCommand(params)

  try {
    const response = await cognitoClient.send(adminInitiateAuthCommand)
    // cookies().set('zeal_session', JSON.stringify({ ...response.AuthenticationResult }))
    // const cookieStore = cookies()
    // cookieStore.getAll().map((cookie) => console.log(cookie.name))
    // return new NextResponse(JSON.stringify({ ...response.AuthenticationResult }), {
    //   status: response['$metadata'].httpStatusCode,
    //   headers: { 'Set-Cookie': `token=${token.value}` }
    // });
    const serverResponse = NextResponse.json(
      {...response.AuthenticationResult},
      {status: response['$metadata'].httpStatusCode}
    );

    serverResponse.cookies.set({
      name: 'zeal_session',
      value: response.AuthenticationResult?.AccessToken || '',
      maxAge: 60*60*24*30,
      httpOnly: true,
      sameSite: true,
    });

    return serverResponse
  } catch (err: any) {
      console.log(err)
      return NextResponse.json({ error: err.toString() }, { status: err['$metadata'].httpStatusCode })
  }
}