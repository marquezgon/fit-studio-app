export const errorMessages: { [key: string]: string } = {
  'LimitExceededException: Attempt limit exceeded, please try after some time.': 'Excediste el número de intentos. Por favor espera unos minutos.',
  'NotAuthorizedException: Incorrect username or password.': 'Número o contraseña incorrecta. Intenta de nuevo.',
  'UsernameExistsException: An account with the given phone_number already exists.': 'Usuario con ese número ya existe.',
  'InvalidPasswordException: Password did not conform with policy: Password not long enough': 'Contraseña muy corta. Mínimo 6 caracteres.'
}