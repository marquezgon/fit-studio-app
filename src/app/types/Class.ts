export interface IClass {
  id: string
  date: string
  category?: string
  coach: string
  code?: string
  description?: string
  type: EClassType
  created: string
  active: boolean
}

export interface IClassSorted {
  [key: string]: IClass[]
}

export interface IClassInfo {
  id: string
  userId: string
  seat: number
}

export enum EClassType {
  Normal = 'NORMAL',
  Free = 'FREE',
  Special = 'SPECIAL',
  Barre = 'BARRE',
  Yoga = 'YOGA',
  YogaKids = 'YOGA KIDS',
}