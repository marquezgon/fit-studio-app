import { StateCreator } from 'zustand'
import { ModalType } from '../types';

export interface ModalSlice {
  modal: ModalType | null
  toggleModal: (modal: ModalType) => void
}

export const createModalSlice: StateCreator<ModalSlice> = (set) => ({
  modal: ModalType.CONFIRM_CODE,
  toggleModal: (modal) => {
    set({ modal });
  }
})