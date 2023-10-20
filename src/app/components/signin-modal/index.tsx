/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Select, SelectItem} from '@nextui-org/react'
import {Formik, Form, Field, FormikProps} from 'formik'
import * as Yup from 'yup'
import {InputField} from '../fields'
import {PhoneInput} from 'react-international-phone'
import {months, days} from '@/app/utils'
import 'react-international-phone/style.css'
import {ISignInForm} from '@/app/types'

const SigninSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('Campo requerido'),
  password: Yup.string().required('Campo requerido'),
});

const shoeSizes = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]

export default function SignInModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure()

  const handleSubmit = async (values: ISignInForm, actions) => {
    try {
      const response = await fetch(`/api/sign-in`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      if (response.ok) {

      }
    } catch(e) {
      console.log(e)
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 justify-center items-center">
              <img
                src="/logo-black-2.png"
                alt="Zeal Studio Logo"
                width={200}
              />
              <h3 className='text-xl font-[100] pt-6'>HOLD THE VISION, TRUST THE PROCESS</h3>
            </ModalHeader>
            <ModalBody>
              <Formik
                initialValues={{
                  password: 'manchi89',
                  phoneNumber: '+523313186671',
                }}
                validationSchema={SigninSchema}
                onSubmit={handleSubmit}
              >
                {({isSubmitting}: FormikProps<ISignInForm>) => (
                  <Form>
                    {/* <Field name="email" component={InputField} size="sm" /> */}
                    <div className='py-2'>
                      <PhoneInput defaultCountry='mx' className='w-full' />
                    </div>
                    <div className='py-2'>
                      <Field name="password" type="password" placeholder="Contraseña" label="Password" component={InputField} />
                    </div>
                    <div className='flex flex-row pt-6 justify-end gap-8'>
                      <Button color="primary" type='submit' isLoading={isSubmitting}>
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