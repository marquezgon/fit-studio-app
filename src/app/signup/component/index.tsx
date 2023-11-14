/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
'use client'

import React from 'react'
import {Button, Card, CardBody, Link, Select, SelectItem} from '@nextui-org/react'
import {Formik, Form, Field, FormikProps, FieldProps} from 'formik'
import {useRouter} from 'next/navigation'
import * as Yup from 'yup'
import {ISignUpForm} from '@/app/types'
import {InputField, PhoneField} from '@/app/components/fields'
import {errorMessages, months, days} from '@/app/utils'
import 'react-international-phone/style.css'
import TextDivider from '@/app/components/text-divider'

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


export default function SignUpComponent() {
  const router = useRouter()
  const [error, setError] = React.useState<null | string>(null)

  const handleSubmit = async (values: ISignUpForm, actions: any) => {
    const newValues = {
      ...values,
      phoneNumber: values.phoneNumber.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '')
    }

    try {
      const response = await fetch(`/api/sign-up`, {
        method: 'POST',
        body: JSON.stringify(newValues),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      if (response.ok) {
        sessionStorage.setItem('zeal_temp_phone', values.phoneNumber)
        router.push('/login')
      } else {
        const sessionInfo = await response.json()
        setError(errorMessages[sessionInfo.error as string])
        actions.setSubmitting(false)
      }
    } catch(e) {
      console.log(e)
      actions.setSubmitting(false)
    }
  }

  return (
    <Card>
      <CardBody>
        <Formik
          initialValues={{
            phoneNumber: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            hasOwnShoes: 'si',
            shoeSize: 'N/A',
            month: '01',
            day: '01',
            email: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({isSubmitting, values}: FormikProps<ISignUpForm>) => (
            <Form>
              <div className='flex flex-col items-center'>
                <img
                  src="/logo-black-2.png"
                  alt="Zeal Studio Logo"
                  width={200}
                />
                <h3 className='text-xl font-[100] pt-6 pb-4 uppercase'>Sign Up</h3>
              </div>
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
                      label="Do you have your own cycling shoes?"
                      variant="bordered"
                      placeholder="Elige una opción"
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
              {values.hasOwnShoes === 'no' && (
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
              )}
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
              {error && (
                <p className='pb-1' style={{ color: 'rgb(243, 18, 96)' }}>{error}</p>
              )}
              <div className='flex pt-4 justify-end'>
                <Button style={{ backgroundColor: '#232321' }} className='text-white w-full'  type='submit' isLoading={isSubmitting}>
                  Registrarse
                </Button>
              </div>
              <div className='py-4'>
                <TextDivider text='¿Ya tienes una cuenta?' />
              </div>
              <Button
                as={Link}
                variant='bordered'
                className='text-black w-full border-black hover:opacity-80'
                href='/login'
              >
                Iniciar Sesión
              </Button>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  )
}