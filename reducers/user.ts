import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    value: {
      token: string | null,
      firstname: string | null,
      username: string | null,
      email: string | null;
      image: string | null;
      age: number | null,
      gender: string | null,
      userplaces: (string | number |  {} )[];
    };
  };


const initialState: UserState = {
  value: { token: null,
    firstname: null,
    username: null,
    email: null,
    image: null,
    age: null,
    gender: null,
    userplaces:[]},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.value.email = action.payload;
    },
    addPlace: (state, action: PayloadAction<string>) => {
      state.value.userplaces.push(action.payload);
    },
    removePlace: (state, action: PayloadAction<{}>) => {
      state.value.userplaces = state.value.userplaces.filter(e => e.userplaces !== action.payload);
    },
    importUserPlaces: (state, action:PayloadAction<{}>) => {
      state.value.userplaces.push(action.payload);
    },
    addImage: (state, action: PayloadAction<string>) => {
      state.value.image  = action.payload;
      },
    updateImage: (state, action: PayloadAction<string>) => {
      state.value.image  = action.payload;
      },
  },
});

export const { updateEmail, addPlace, removePlace, importUserPlaces, addImage, updateImage } = userSlice.actions;
export default userSlice.reducer;
