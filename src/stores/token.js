import { createSlice } from "@reduxjs/toolkit"
import { TOKEN_NAME } from "@/constant/index"

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: localStorage.getItem(TOKEN_NAME)
  },
  reducers: {
    setToken(state, action) {
      state.value = action.payload
      localStorage.setItem(TOKEN_NAME, action.payload)
    },
    clearToken(state, action) {
      state.value = ''
      localStorage.setItem(TOKEN_NAME, '')
    }
  }
})

export const { setToken, clearToken }  = tokenSlice.actions
export default tokenSlice.reducer