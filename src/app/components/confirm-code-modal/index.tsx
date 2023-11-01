/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, Button} from '@nextui-org/react'
import {Formik, Form, Field, FormikProps} from 'formik'
import * as Yup from 'yup'
import {InputField, PhoneField} from '../fields'
import 'react-international-phone/style.css'
import {IConfirmationCodeForm, ModalProps, ModalType} from '@/app/types'
import {useAppStore} from '@/app/store'
import { errorMessages } from '@/app/utils'

const ConfirmationCodeSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('Campo requerido'),
  code: Yup.number().required('Campo requerido'),
});

export default function ConfirmCodeModal(props: ModalProps) {
  const [error, setError] = React.useState<null | string>(null)
  const {toggleModal} = useAppStore()
  const handleSubmit = async (values: IConfirmationCodeForm, actions: any) => {
    setError(null)
    try {
      const response = await fetch(`/api/confirm-code`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      const jsonRes = await response.json()
      if (response.ok) {
        toggleModal(ModalType.SELECT_PACKAGE)
      } else {
        setError(errorMessages[jsonRes.error])
      }
    } catch(e) {
      // console.log(e)
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
              <h3 className='text-xl font-[100] pt-6'>HOLD THE VISION, TRUST THE PROCESS</h3>
            </ModalHeader>
            <ModalBody>
              <Formik
                initialValues={{
                  phoneNumber: '+523313186670',
                  code: 123456,
                }}
                validationSchema={ConfirmationCodeSchema}
                onSubmit={handleSubmit}
              >
                {({isSubmitting}: FormikProps<IConfirmationCodeForm>) => (
                  <Form>
                    {/* <Field name="email" component={InputField} size="sm" /> */}
                    <div className='py-2'>
                      <PhoneField />
                    </div>
                    <div className='py-2'>
                      <Field name="code" placeholder="123456" label="Ingresa el código que recibiste vía SMS" component={InputField} />
                    </div>
                    {error && (
                      <p className='text-orange-700	'>{error}</p>
                    )}
                    <div className='flex flex-row pt-6 pb-2 justify-end gap-8'>
                      <Button color="primary" type='submit' isLoading={isSubmitting}>
                        Confirm Code
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