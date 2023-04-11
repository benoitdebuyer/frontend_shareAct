import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    value: {
      email: string | null;
      token: string | null,
      places: (string | number)[];
      photos: string[];
    };
  };


const initialState: UserState = {
  value: { email: null, token: null, places: [], photos: [] },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.value.email = action.payload;
    },
    addPlace: (state, action: PayloadAction<string>) => {
      state.value.places.push(action.payload);
    },
    removePlace: (state, action: PayloadAction<string>) => {
      state.value.places = state.value.places.filter(e => e.places !== action.payload);
    },
    importPlaces: (state, action) => {
      state.value.places = action.payload;
    },
    addPhoto: (state, action: PayloadAction<string>) => {
        state.value.photos.push(action.payload);
      },
      removePhoto: (state, action: PayloadAction<string>) => {
        state.value.photos = state.value.photos.filter((data) => data !== action.payload);
      },
  },
});

export const { updateEmail, addPlace, removePlace, importPlaces, addPhoto, removePhoto } = userSlice.actions;
export default userSlice.reducer;
