import { NextRequest, NextResponse } from 'next/server'
import { CognitoIdentityProviderClient, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider'
import { ISignUpForm } from '@/app/types';

const cognitoClientId = '5s88dvfp61s33h0r50hutirv36'
const cognitoRegion = 'us-east-1'

export async function POST(req: NextRequest, res: NextResponse) {
  const data: ISignUpForm = await req.json();
  console.log(data);

  const params = {
    ClientId: cognitoClientId,
    Password: data.password,
    Username: '+523313186670',
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
  const cognitoClient = new CognitoIdentityProviderClient({
    region: cognitoRegion
  })
  const signUpCommand = new SignUpCommand(params)

  try {
    const response = await cognitoClient.send(signUpCommand)
    console.log(response)
    return new NextResponse(JSON.stringify({ answer: "Success" }), {
      status: response['$metadata'].httpStatusCode,
    });
  } catch (err) {
      console.log(err)
      // const headers = req.headers;
      return NextResponse.json({ error: err.toString() }, { status: err['$metadata'].httpStatusCode })

      // return res.status(err['$metadata'].httpStatusCode).json({ message: err.toString() })
  }
}