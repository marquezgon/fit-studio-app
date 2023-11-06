export interface IPackage {
  id: string
  name: string
  price: number
  expires_in: number
}

export interface IUserPackage {
  user_id: string
  package_id: string
  active: boolean
  amount: number
  expires_at: string
}