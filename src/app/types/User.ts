export interface IUser {
  id: string | undefined
  firstName: string
  lastName: string
  phoneNumber: string
}
interface CognitoUserInfo {
  Name: string
  Value: string
}
export interface CognitoUser {
  user: CognitoUserInfo[]
}