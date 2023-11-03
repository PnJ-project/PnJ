// modalSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface ModalState {
  isOpen: boolean;
  isSideOpen: boolean;
  isDemoPopupOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
  isSideOpen: false,
  isDemoPopupOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
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
    openDemoModal: (state) => {
      state.isDemoPopupOpen = true;
    },
    closeDemoModal: (state) => {
      state.isDemoPopupOpen = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  openSideModal,
  closeSideModal,
  openDemoModal,
  closeDemoModal,
} = modalSlice.actions;
export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;
export const selectIsSideModalOpen = (state: RootState) =>
  state.modal.isSideOpen;
export const selectIsDemoModalOpen = (state: RootState) =>
  state.modal.isDemoPopupOpen;
export default modalSlice.reducer;
