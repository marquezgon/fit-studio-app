import {create} from 'zustand'
import {createModalSlice, ModalSlice} from './slices/createModalSlice'
import {createUserSlice, UserSlice} from './slices/createUserSlice'
import {createClassesSlice, ClassesSlice} from './slices/createClassesSlice'

type StoreState = ModalSlice & UserSlice & ClassesSlice

export const useAppStore = create<StoreState>()((...a) => ({
    ...createModalSlice(...a),
    ...createUserSlice(...a),
    ...createClassesSlice(...a),
}))