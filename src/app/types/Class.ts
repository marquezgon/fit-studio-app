import { SpotStatus } from "../components/spot"

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
  type?: string
  coach?: string
  date?: string
}

export enum EClassType {
  Normal = 'NORMAL',
  Free = 'FREE',
  Special = 'SPECIAL',
  Barre = 'BARRE',
  Yoga = 'YOGA',
  YogaKids = 'YOGA KIDS',
}

export interface IBookedClass {
  [key: string]: {
    bookedSeats: SpotStatus[]
  }
}

export interface ICancelClassModal {
  showModal: boolean
  selectedClass: IClassInfo | null
}