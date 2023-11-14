/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import {Button, Card, CardBody, Link} from '@nextui-org/react'
import {Formik, Form, Field, FormikProps} from 'formik'
import {useRouter} from 'next/navigation'
import * as Yup from 'yup'
import {CognitoIdentityProviderClient, GetUserCommand} from '@aws-sdk/client-cognito-identity-provider'
import {useAppStore} from '@/app/store'
import {ISignInForm} from '@/app/types'
import {InputField, PhoneField} from '@/app/components/fields'
import {errorMessages} from '@/app/utils'
import 'react-international-phone/style.css'
import TextDivider from '@/app/components/text-divider'

const SigninSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('Campo requerido'),
  password: Yup.string().required('Campo requerido'),
})


export default function LogInComponent() {
  const {setUser} = useAppStore()
  const router = useRouter()
  const [error, setError] = React.useState<null | string>(null)
  const [phoneNumber, setPhoneNumber] = React.useState<string>('')

  React.useEffect(() => {
    const presetPhoneNumber = sessionStorage.getItem('zeal_temp_phone') || ''
    setPhoneNumber(presetPhoneNumber)
  }, [phoneNumber])

  const handleSubmit = async (values: ISignInForm, actions: any) => {
    const newValues = {
      ...values,
      phoneNumber: values.phoneNumber.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '')
    }

    try {
      const response = await fetch(`/api/sign-in`, {
        method: 'POST',
        body: JSON.stringify(newValues),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      const sessionInfo = await response.json()
      if (response.ok) {
        localStorage.setItem('zeal_session', JSON.stringify(sessionInfo))
        const cognitoClient = new CognitoIdentityProviderClient({region: 'us-east-1'})
        
        const input = {AccessToken: sessionInfo.AccessToken};
        const command = new GetUserCommand(input);
        const data = await cognitoClient.send(command);

        const userAttributes = data.UserAttributes!.reduce((acc, prev) => {
          if (prev.Name === 'given_name') {
            acc.firstName = prev.Value!
          } else if (prev.Name === 'family_name') {
            acc.lastName = prev.Value!
          } else if (prev.Name === 'phone_number') {
            acc.phoneNumber = prev.Value!
          }
          return acc
        }, {firstName: '', lastName: '', phoneNumber: ''})

        setUser({
          id: data.Username,
          ...userAttributes
        })

        router.push('/profile')
        
      } else {
        console.log(sessionInfo)
        setError(errorMessages[sessionInfo.error as string])
        actions.setSubmitting(false)
      }
    } catch(e) {
      console.log(e)
      actions.setSubmitting(false)
    }
  }

  console.log(phoneNumber)

  return (
    <Card>
      <CardBody>
        <Formik
          enableReinitialize
          initialValues={{
            password: '',
            phoneNumber: phoneNumber
          }}
          validationSchema={SigninSchema}
          onSubmit={handleSubmit}
        >
          {({isSubmitting}: FormikProps<ISignInForm>) => (
            <Form>
              <div className='flex flex-col items-center'>
                <img
                  src="/logo-black-2.png"
                  alt="Zeal Studio Logo"
                  width={200}
                />
                <h3 className='text-xl font-[100] pt-6 pb-4 uppercase'>Log In</h3>
              </div>
              <div className='py-2'>
              <PhoneField />
              </div>
              <div className='py-2'>
                <Field name="password" type="password" placeholder="Contraseña" label="Password" component={InputField} />
              </div>
              {error && (
                <p className='pb-1' style={{ color: 'rgb(243, 18, 96)' }}>{error}</p>
              )}
              <div className='flex pt-4 justify-end'>
                <Button style={{ backgroundColor: '#232321' }} className='text-white w-full'  type='submit' isLoading={isSubmitting}>
                  Iniciar Sesión
                </Button>
              </div>
              <div className='py-4'>
                <TextDivider text='¿No tienes una cuenta?' />
              </div>
              <Button
                as={Link}
                variant='bordered'
                className='text-black w-full border-black hover:opacity-80'
                href='/signup'
              >
                Registrarse
              </Button>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  )
}