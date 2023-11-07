import {StateCreator} from 'zustand'
import {ModalAction, ModalType} from '../types';

export interface ModalSlice {
  modal: ModalType | null
  action: ModalAction
  toggleModal: (modal: ModalType | null) => void
  setAction: (action: ModalAction) => void
}

export const createModalSlice: StateCreator<ModalSlice> = (set) => ({
  modal: ModalType.SELECT_PACKAGE,
  action: ModalAction.NORMAL,
  toggleModal: (modal) => {
    set({ modal });
  },
  setAction: (action) => {
    set({ action });
  }
})