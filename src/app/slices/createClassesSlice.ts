import {StateCreator} from 'zustand'
import {ModalAction, IBookedClass, ICancelClassModal} from '../types';
import { SpotStatus } from '../components/spot';

export interface ClassesSlice {
  classes: IBookedClass
  setClass: (classId: string, seats: SpotStatus[]) => void
  cancelClassModal: ICancelClassModal
  setCancelClassModal: (cancelClassModal: ICancelClassModal) => void
}

export const createClassesSlice: StateCreator<ClassesSlice> = (set) => ({
  classes: {},
  cancelClassModal: {
    showModal: false,
    selectedClass: null
  },
  setCancelClassModal: (cancelClassModal) => {
    set({ cancelClassModal })
  },
  setClass: (classId, seats) => {
    set((state) => {
      const classesState = { ...state.classes }
      classesState[classId] = { bookedSeats: seats }

      return { ...state, classes: classesState }
    })
  }
})