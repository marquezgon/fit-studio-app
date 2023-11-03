export interface ModalProps {
  isOpen: boolean
  onOpenChange: () => void
}

export enum ModalType {
  SIGN_IN = 'SignIn',
  SIGN_UP = 'SignUp',
  CONFIRM_CODE = 'ConfirmCode',
  SELECT_PACKAGE = 'SelectPackage'
}

export enum ModalAction {
  NORMAL = 'Normal',
  FROM_SIGN_UP = 'FromSignUp',
}