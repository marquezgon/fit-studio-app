import {PhoneInput} from 'react-international-phone'
import styles from './style.module.css'

export default function PhoneField() {
  return (
    <PhoneInput
      defaultCountry='mx'
      className='border-medium rounded-lg h-14'
      inputClassName={styles.phoneFieldInput}
      countrySelectorStyleProps={{ buttonClassName: styles.phoneFieldBtn }}
    />
  )
}