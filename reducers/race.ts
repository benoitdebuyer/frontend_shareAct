import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    email: null,
    token: null,
    places: [],
    photos: [],
    addracebyuser: {},
    newracelat: null,
    newracelon: null,
    newAddress: null,
    // Pour ajouter l'id de la course 
    idRace : null, 
  }
}
export const userSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    updatenewracelat: (state, action) => {
      state.value.newracelat = action.payload;
    },
    updatenewracelon: (state, action) => {
      state.value.newracelon = action.payload;
    },
    udptadeIdRace: (state, action) => {
      state.value.idRace = action.payload;
    },
    

    addNewAddress: (state, action) => {
      state.value.newAddress = action.payload;
    },
    addRaceByUser: (state, action) => {
      state.value.addracebyuser = action.payload;
    },
    delRaceByUser: (state) => {
      state.value.addracebyuser = {};
    },
    removePlace: (state, action) => {
      state.value.places = state.value.places.filter(e => e.name !== action.payload);
    },
    addPlaces: (state, action) => {
      state.value.places = action.payload;
    },
  }
});

export const { updatenewracelat, updatenewracelon, addNewAddress, addRaceByUser, delRaceByUser, removePlace, addPlaces, udptadeIdRace } = userSlice.actions;
export default userSlice.reducer;
