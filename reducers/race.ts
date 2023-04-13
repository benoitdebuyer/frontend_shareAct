
      import { createSlice } from '@reduxjs/toolkit';

      const initialState = {
        value: {    email:  null,
          token:null,
          places:[],
          photos: [],
          newracelat:null,
          newracelon: null,
      }
    }
      export const userSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
          updatenewracelat: (state, action) => {
            state.value.newracelat = action.payload;
          },
          updatenewracelon: (state, action) => {
            state.value.newracelon = action.payload; 
          
          },
          removePlace: (state, action) => {
            state.value.places = state.value.places.filter(e => e.name !== action.payload);
          },
          addPlaces: (state, action) => {
            state.value.places=action.payload;
        },
      }
      });
      
      export const { updatenewracelat, updatenewracelon, removePlace,addPlaces } = userSlice.actions;
      export default userSlice.reducer;
      