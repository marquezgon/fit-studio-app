import { StateCreator } from 'zustand'
import {IUser} from '../types';

export interface UserSlice {
  user: IUser | null
  setUser: (user: IUser) => void
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  }
})