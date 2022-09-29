import { createSlice } from "@reduxjs/toolkit"

const accountSlice =createSlice({
  name: 'account',
  initialState: {},
  reducers: {
    setAccount(state, action) {
      for (const key in action.payload) {
        state[key] = action.payload[key]
      }
    },
    clearAccount(state, action) {
      for (const key in state) {
        state[key] = ''
      }
    }
  }
})
export const { setAccount, clearAccount } = accountSlice.actions
export default accountSlice.reducer