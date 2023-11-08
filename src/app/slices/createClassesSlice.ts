import {StateCreator} from 'zustand'
import {ModalAction, IBookedClass} from '../types';
import { SpotStatus } from '../components/spot';

export interface ClassesSlice {
  classes: IBookedClass
  setClass: (classId: string, seats: SpotStatus[]) => void
}

export const createClassesSlice: StateCreator<ClassesSlice> = (set) => ({
  classes: {},
  setClass: (classId, seats) => {
    set((state) => {
      const classesState = { ...state.classes }
      classesState[classId] = { bookedSeats: seats }

      return { ...state, classes: classesState }
    })
  }
})