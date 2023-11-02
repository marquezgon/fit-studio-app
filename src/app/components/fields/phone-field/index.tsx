import {PhoneInput} from 'react-international-phone'
import {Field, FieldProps} from 'formik'
import styles from './style.module.css'

export default function PhoneField(props: any) {
  return (
    <Field
      name="phoneNumber"
    >
      {({ field, form: { setFieldValue, values } }: FieldProps) => (
        <div>
          <PhoneInput
            defaultCountry='mx'
            className='border-medium rounded-lg h-14'
            inputClassName={styles.phoneFieldInput}
            countrySelectorStyleProps={{ buttonClassName: styles.phoneFieldBtn }}
            {...props}
            {...field}
            value={values.phoneNumber}
            onChange={(val) => setFieldValue('phoneNumber', val)}
          />
        </div>
      )}
    </Field>
  )
}