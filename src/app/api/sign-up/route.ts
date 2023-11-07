import { NextRequest, NextResponse } from 'next/server'
import { CognitoIdentityProviderClient, SignUpCommand, AdminConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider'
import { ISignUpForm } from '@/app/types';

const cognitoClientId = '5s88dvfp61s33h0r50hutirv36'
const cognitoRegion = 'us-east-1'
const COGNITO_USER_POOL_ID = 'us-east-1_9QZbfNJmK'

export async function POST(req: NextRequest, res: NextResponse) {
  const data: ISignUpForm = await req.json();

  const params = {
    ClientId: cognitoClientId,
    Password: data.password,
    Username: data.phoneNumber,
    UserAttributes: [
      {
          Name: 'custom:Size',
          Value: data.shoeSize
      },
      {
        Name: 'family_name',
        Value: data.lastName
      },
      {
        Name: 'given_name',
        Value: data.firstName
      },
      {
        Name: 'gender',
        Value: 'M'
      },
      {
        Name: 'email',
        Value: data.email
      },
      {
        Name: 'birthdate',
        Value: `${data.month}/${data.day}/2000`
      }
    ]
  }
  const cognitoClient = new CognitoIdentityProviderClient({region: cognitoRegion})
  const signUpCommand = new SignUpCommand(params)

  const input = { // AdminConfirmSignUpRequest
    UserPoolId: COGNITO_USER_POOL_ID, // required
    Username: data.phoneNumber, // required
    ClientMetadata: {}
  }

  try {
    const response = await cognitoClient.send(signUpCommand)
    const command = new AdminConfirmSignUpCommand(input)
    const confirmSignUpResponse = await cognitoClient.send(command);

    return new NextResponse(JSON.stringify({ ...confirmSignUpResponse }), {
      status: response['$metadata'].httpStatusCode,
    })

  } catch (err: any) {
    return NextResponse.json({ error: err.toString() }, { status: err['$metadata'].httpStatusCode })
  }
}