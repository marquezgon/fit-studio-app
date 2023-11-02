import {Input} from '@nextui-org/react'
import {FieldProps} from 'formik';

export default function InputField({
  field,
  form: { touched, errors },
  ...props
}: FieldProps) {

  const isInvalid = touched[field.name] && errors[field.name]

  return (
    <div>
      <Input
        variant="bordered"
        isInvalid={isInvalid as boolean}
        color={isInvalid ? "danger" : "default"}
        errorMessage={isInvalid && `${errors[field.name]}`}
        {...field} {...props}
      />
    </div>
  )
}