import { StateCreator } from 'zustand'
import { ModalType } from '../types';

export interface ModalSlice {
  modal: ModalType | null
  toggleModal: (modal: ModalType) => void
}

export const createModalSlice: StateCreator<ModalSlice> = (set) => ({
  modal: null,
  toggleModal: (modal) => {
    set({ modal });
  }
})