import {create} from 'zustand'
import {createModalSlice, ModalSlice} from './slices/createModalSlice'

type StoreState = ModalSlice

export const useAppStore = create<StoreState>()((...a) => ({
    ...createModalSlice(...a),
}))