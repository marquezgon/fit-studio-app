export interface ISignUpForm {
  firstName: string
  lastName: string
  hasOwnShoes: string
  password: string
  confirmPassword: string
  month: string
  day: string
  shoeSize: string
  email: string
  phoneNumber: string
}

export interface ISignInForm {
  phoneNumber: string
  password: string
}

export interface IConfirmationCodeForm {
  phoneNumber: string
  code: number
}