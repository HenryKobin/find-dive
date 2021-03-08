import { createSlice } from '@reduxjs/toolkit'
const axios = require('axios')

export const diveSlice = createSlice({
  name: 'diver_config',
  initialState: {
    diverCurrentLocationString: '',
    diverCurrentLocationJSON: {},
    diveSites: [],
    focusedDiveSite: null,
    siteDetailVisible: false

  },
  reducers: {

    setCurrentLocationString: (state, locationString) => {
        state.diverCurrentLocationString = locationString.payload
    },
    setCurrentLocationJSON: (state, action) => {
        state.diverCurrentLocationJSON = action.payload
    },
    setDiveSites: (state, action) => {
      state.diveSites = action.payload;
    },
    setFocusedSite: (state, action) => {
      console.log('!!!')
      state.focusedDiveSite = action.payload;
    },

  setDiveSiteVis: (state, action) => {
    state.siteDetailVisible = action.payload;
    }
    }

})

export const getCurrentLocationString = (state) => state.diverConfig.diverCurrentLocationString
export const getCurrentLocationJSON = (state) => state.diverConfig.diverCurrentLocationJSON
export const getDiveSites = (state) => state.diverConfig.diveSites
export const getFocusedSite = (state) => state.diverConfig.focusedDiveSite
export const getSiteDetailVis = (state) => state.diverConfig.siteDetailVisible
export const {
  setCurrentLocationString,
  setCurrentLocationJSON,
  setDiveSites,
  setDiveSiteVis,
  setFocusedSite
} = diveSlice.actions

export default diveSlice.reducer
