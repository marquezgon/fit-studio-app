import {create} from 'zustand'
import {createModalSlice, ModalSlice} from './slices/createModalSlice'
import {createUserSlice, UserSlice} from './slices/createUserSlice'

type StoreState = ModalSlice & UserSlice

export const useAppStore = create<StoreState>()((...a) => ({
    ...createModalSlice(...a),
    ...createUserSlice(...a),
}))