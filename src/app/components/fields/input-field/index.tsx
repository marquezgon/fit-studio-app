import {Input} from '@nextui-org/react'

export default function InputField({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) {

  const isInvalid = touched[field.name] && errors[field.name]

  return (
    <div>
      <Input
        variant="bordered"
        isInvalid={isInvalid}
        color={isInvalid ? "danger" : "default"}
        errorMessage={isInvalid && `${errors[field.name]}`}
        {...field} {...props}
      />
    </div>
  )
}