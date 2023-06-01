import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface ModalState {
  registerModal: boolean;
  loginModal: boolean;
  elementModal: boolean;
}

// Define the initial state using that type
const initialState: ModalState = {
    registerModal: false,
    loginModal: false,
    elementModal: false
}

export const modalSlice = createSlice({
  name: 'modal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    registerModalFunc: (state) => {
      state.registerModal = !state.registerModal
    },
    loginModalFunc: (state) => {
        state.loginModal = !state.loginModal
    },
    elementModalFunc: (state) => {
        state.elementModal = !state.elementModal
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

export const { registerModalFunc, loginModalFunc, elementModalFunc } = modalSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default modalSlice.reducer