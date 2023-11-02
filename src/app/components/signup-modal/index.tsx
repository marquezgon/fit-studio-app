/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
'use client'

import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, Button, Select, SelectItem} from '@nextui-org/react'
import {Formik, Form, Field, FormikProps, FieldProps} from 'formik'
import * as Yup from 'yup'
import {InputField, PhoneField} from '../fields'
import {months, days} from '@/app/utils'
import {useAppStore} from '@/app/store'
import 'react-international-phone/style.css'
import {ISignUpForm, ModalProps, ModalType} from '@/app/types'

const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('Campo requerido'),
  email: Yup.string().required('Campo requerido').email('Email inválido'),
  firstName: Yup.string().required('Campo requerido'),
  lastName: Yup.string().required('Campo requerido'),
  shoeSize: Yup.string().required('Campo requerido'),
  hasOwnShoes: Yup.string().required().oneOf(["si", "no"]),
  password: Yup.string().required('Campo requerido'),
  confirmPassword: Yup.string().required('Campo requerido').oneOf([Yup.ref('password')], 'Contraseñas no coinciden')
});

const shoeSizes = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50]

export default function SignUpModal(props: ModalProps) {
  const {toggleModal} = useAppStore()
  const handleSubmit = async (values: ISignUpForm, actions) => {
    try {
      const response = await fetch(`/api/sign-up`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      if (response.ok) {
        toggleModal(ModalType.CONFIRM_CODE)
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
              <h3 className='text-3xl font-[100] pt-6'>JOIN THE MOVEMENT</h3>
              <h5 className='text-sm font-[100]'>PON TU ALMA EN MOVIMIENTO</h5>
            </ModalHeader>
            <ModalBody>
              <Formik
                initialValues={{
                  phoneNumber: '',
                  firstName: 'Gonzalo',
                  lastName: 'Marquez',
                  password: 'manchi89',
                  confirmPassword: 'manchi89',
                  hasOwnShoes: 'no',
                  shoeSize: '32',
                  month: '01',
                  day: '01',
                  email: 'marquezgon89@icloud.com'
                }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
              >
                {({isSubmitting}: FormikProps<ISignUpForm>) => (
                  <Form>
                    {/* <Field name="email" component={InputField} size="sm" /> */}
                    <div className='py-2'>
                      <PhoneField />
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-2">
                      <Field name="firstName" placeholder="Nombre" label="Name" component={InputField} />
                      <Field name="lastName" placeholder="Apellido(s)" label="Last Name" component={InputField} />
                      <Field name="password" type="password" placeholder="Contraseña" label="Password" component={InputField} />
                      <Field name="confirmPassword" type="password" placeholder="Confirma tu contraseña" label="Confirm Password" component={InputField} />
                    </div>
                    <div className='py-2'>
                      <Field name="email" placeholder="Correo Electrónico" label="Email" component={InputField} />
                    </div>
                    <Field
                      name="hasOwnShoes"
                    >
                      {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
                        <div className='py-2'>
                          <Select
                            label="Do you have your own riding shoes?"
                            variant="bordered"
                            placeholder="No"
                            errorMessage={touched[field.name] && errors[field.name] && `${errors[field.name]}`}
                            isInvalid={(touched[field.name] && errors[field.name]) as boolean}
                            onSelectionChange={(val) => { const selectedKey = val['currentKey']; setFieldValue('hasOwnShoes', selectedKey) }}
                            {...field}
                          >
                            <SelectItem key="no" value="no">
                                No
                            </SelectItem>
                            <SelectItem key="si" value="si">
                                Si
                            </SelectItem>
                          </Select>
                        </div>
                      )}
                    </Field>
                    <Field
                      name="shoeSize"
                    >
                      {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
                        <div className='py-2'>
                          <Select
                            label="Shoe Size"
                            variant="bordered"
                            placeholder="Elige tu tamaño"
                            errorMessage={touched[field.name] && errors[field.name] && `${errors[field.name]}`}
                            isInvalid={(touched[field.name] && errors[field.name]) as boolean}
                            onSelectionChange={(val) => { const selectedKey = val['currentKey']; setFieldValue('shoeSize', selectedKey) }}
                            {...field}
                          >
                            {shoeSizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      )}
                    </Field>
                    <div className="grid grid-cols-2 gap-2">
                      <Field
                        name="month"
                      >
                        {({ field, form: { touched, errors, setFieldValue } }: FieldProps) => (
                          <div className='py-2'>
                            <Select
                              label="Birthday (Mes)"
                              variant="bordered"
                              defaultValue='01'
                              placeholder="Enero"
                              errorMessage={touched[field.name] && errors[field.name] && `${errors[field.name]}`}
                              isInvalid={touched[field.name] && errors[field.name]}
                              onSelectionChange={(val) => { const selectedKey = val['currentKey']; setFieldValue('month', selectedKey) }}
                              {...field}
                            >
                              {months.map((month) => (
                                <SelectItem key={month.value} value={month.value}>
                                  {month.label}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                        )}
                      </Field>
                      <Field
                        name="day"
                      >
                        {({ field, form: { touched, errors, setFieldValue, values } }: FieldProps) => (
                          <div className='py-2'>
                            <Select
                              label="Birthday (Día)"
                              variant="bordered"
                              defaultValue='01'
                              placeholder="1"
                              errorMessage={touched[field.name] && errors[field.name] && `${errors[field.name]}`}
                              isInvalid={(touched[field.name] && errors[field.name]) as boolean}
                              onSelectionChange={(val) => { const selectedKey = val['currentKey']; setFieldValue('day', selectedKey) }}
                              {...field}
                            >
                              {days[values.month].map((day) => (
                                <SelectItem key={day} value={day}>
                                  {day}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                        )}
                      </Field>
                    </div>
                    {/* <Input inputRef={inputRef}/> */}
                    <div className='flex flex-row pt-6 justify-end gap-8'>
                      <Button color="primary" type='submit' isLoading={isSubmitting}>
                        Registrarse
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