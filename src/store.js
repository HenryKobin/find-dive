import { configureStore } from '@reduxjs/toolkit'
import DiverReducer from './DiverReducer'
export default configureStore({
  reducer: {
    diverConfig: DiverReducer,
  }
})
