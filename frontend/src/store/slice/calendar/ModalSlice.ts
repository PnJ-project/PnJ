// modalSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface ModalState {
  isOpen: boolean;
  isSideOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
  isSideOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    openSideModal: (state) => {
      state.isSideOpen = true;
    },
    closeSideModal: (state) => {
      state.isSideOpen = false;
    },
  },
});

export const { openModal, closeModal, openSideModal,closeSideModal } = modalSlice.actions;
export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;
export const selectIsSideModalOpen = (state: RootState) => state.modal.isSideOpen;
export default modalSlice.reducer;
