/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, Button, Link} from '@nextui-org/react'
import {Formik, Form, Field, FormikProps} from 'formik'
import * as Yup from 'yup'
import {InputField, PhoneField} from '../fields'
import {useAppStore} from '@/app/store'
import 'react-international-phone/style.css'
import {ISignInForm, ModalProps, ModalType} from '@/app/types'
import {CognitoIdentityProviderClient, GetUserCommand} from '@aws-sdk/client-cognito-identity-provider'
import {errorMessages} from '@/app/utils'

const SigninSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('Campo requerido'),
  password: Yup.string().required('Campo requerido'),
});

export default function SignInModal(props: ModalProps) {
  const {toggleModal, setUser} = useAppStore()
  const [error, setError] = React.useState<null | string>(null)
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
        toggleModal(null)
      } else {
        console.log(sessionInfo)
        setError(errorMessages[sessionInfo.error as string])
      }
    } catch(e) {
      console.log(e)
    } finally {
      actions.setSubmitting(false);
    }
  }

  const presetPhoneNumber = sessionStorage.getItem('zeal_temp_phone')

  return (
    <Modal 
      isOpen={props.isOpen} 
      onOpenChange={props.onOpenChange}
      placement="top-center"
      isDismissable={false}
      onClose={() => toggleModal(null)}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 justify-center items-center">
              <img
                src="/logo-black-2.png"
                alt="Zeal Studio Logo"
                width={200}
              />
              <h3 className='text-xl font-[100] pt-6 uppercase'>Iniciar Sesión</h3>
            </ModalHeader>
            <ModalBody>
              <Formik
                initialValues={{
                  password: '',
                  phoneNumber: presetPhoneNumber || '',
                }}
                validationSchema={SigninSchema}
                onSubmit={handleSubmit}
              >
                {({isSubmitting}: FormikProps<ISignInForm>) => (
                  <Form>
                    {/* <Field name="email" component={InputField} size="sm" /> */}
                    <div className='py-2'>
                    <PhoneField />
                    </div>
                    <div className='py-2'>
                      <Field name="password" type="password" placeholder="Contraseña" label="Password" component={InputField} />
                    </div>
                    {error && (
                      <p className='text-orange-700 pb-1'>{error}</p>
                    )}
                    <div className='flex flex-row items-center pt-4 justify-between 2'>
                      <div>
                        <Link
                          href="#" onClick={() => toggleModal(ModalType.SIGN_UP)}
                          className='hover:underline text-gray-950 sm:text-[.92rem]'
                        >
                          ¿No tienes una cuenta? Regístrate aquí
                        </Link>
                      </div>
                      <Button style={{ backgroundColor: '#232321', color: 'white' }} type='submit' isLoading={isSubmitting}>
                        Log In
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}