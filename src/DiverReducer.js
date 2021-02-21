import { createSlice } from '@reduxjs/toolkit'
const axios = require('axios')

const POSITION_API_KEY = "553a4010066e95eb55e4b8de0df0f33b"

export const diveSlice = createSlice({
  name: 'diver_config',
  initialState: {
    diverCurrentLocationString:'',
    diveSites: [],

  },
  reducers: {


    setCurrentLocationString: (state, locationString) => {
        state.diverCurrentLocationString = locationString.payload
    },

    setCurrentLocationJSON: (state, action) => {
        state.diverCurrentLocation = action.payload
    },

    setDiveSitesTest: (state, action) => {
      {/* used in development, divesites api needs https */}
      state.diveSites = [

    {
      "currents": null,
      "distance": "17.04",
      "hazards": null,
      "lat": "33.9978",
      "name": "Star of Scotland Shipwreck",
      "water": null,
      "marinelife": null,
      "description": null,
      "maxdepth": null,
      "mindepth": null,
      "predive": null,
      "id": "23902",
      "equipment": null,
      "lng": "-118.5242"
    },
    {
      "currents": null,
      "distance": "19.09",
      "hazards": null,
      "lat": "34.0362",
      "name": "Big Rock",
      "water": null,
      "marinelife": null,
      "description": null,
      "maxdepth": null,
      "mindepth": null,
      "predive": null,
      "id": "21726",
      "equipment": null,
      "lng": "-118.6096"
    },
    {
      "currents": null,
      "distance": "20.28",
      "hazards": null,
      "lat": "33.9183",
      "name": "The Pipe",
      "water": null,
      "marinelife": null,
      "description": null,
      "maxdepth": null,
      "mindepth": null,
      "predive": null,
      "id": "24369",
      "equipment": null,
      "lng": "-118.4822"
    },
    {
      "currents": null,
      "distance": "21.29",
      "hazards": null,
      "lat": "33.8821",
      "name": "Manhattan Beach",
      "water": null,
      "marinelife": null,
      "description": null,
      "maxdepth": null,
      "mindepth": null,
      "predive": null,
      "id": "18317",
      "equipment": null,
      "lng": "-118.4130"
    },
    {
      "currents": null,
      "distance": "23.67",
      "hazards": null,
      "lat": "33.8448",
      "name": "Redondo Breakwaters",
      "water": null,
      "marinelife": null,
      "description": null,
      "maxdepth": null,
      "mindepth": null,
      "predive": null,
      "id": "17969",
      "equipment": null,
      "lng": "-118.4007"
    }
      ]
    },

    setDiveSites: (state, action) => {
      const url = `http://api.divesites.com/?mode=sites&lat=${action.payload['lat']}&lng=${action.payload['lon']}&dist=25 `
      axios.get(url)
      .then(function (response) {
        console.log(response.data)
                state.diveSites = [response.data.sites]
      })
      .catch(function (error) {
        console.log(error);
      })

    }

  }

})



export const fetchDiveSites = () => {

}

export const getCurrentLocationString = (state) => state.diverConfig.diverCurrentLocationString
export const getCurrentLocationJSON = (state) => state.diverConfig.diverCurrentLocationJSON
export const getDiveSites = (state) => state.diverConfig.diveSites
export const {
  setCurrentLocationString,
  setCurrentLocationJSON,
  setDiveSites,
  setDiveSitesTest
} = diveSlice.actions

export default diveSlice.reducer
