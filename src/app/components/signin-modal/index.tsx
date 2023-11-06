/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, Button} from '@nextui-org/react'
import {Formik, Form, Field, FormikProps} from 'formik'
import * as Yup from 'yup'
import {InputField, PhoneField} from '../fields'
import {useAppStore} from '@/app/store'
import 'react-international-phone/style.css'
import {ISignInForm, ModalAction, ModalProps, ModalType} from '@/app/types'

const SigninSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('Campo requerido'),
  password: Yup.string().required('Campo requerido'),
});

export default function SignInModal(props: ModalProps) {
  const {toggleModal, action} = useAppStore()
  const handleSubmit = async (values: ISignInForm, actions: any) => {
    const newValues = {
      ...values,
      phoneNumber: values.phoneNumber.replaceAll(' ', '')
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
      if (response.ok) {
        const sessionInfo = await response.json()
        localStorage.setItem('zeal_session', JSON.stringify(sessionInfo))
        if (action === ModalAction.FROM_SIGN_UP) {
          toggleModal(ModalType.SELECT_PACKAGE)
        } else {
          toggleModal(null)
        }
      }
    } catch(e) {
      console.log(e)
    } finally {
      actions.setSubmitting(false);
    }
  }

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
                  phoneNumber: '',
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
                    <div className='flex flex-row pt-6 justify-end gap-8'>
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