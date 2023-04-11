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
      userplaces: [],
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
    userplaces:null},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateFirstname:(state, action: PayloadAction<string>) => {
      state.value.firstname = action.payload;
    },
    updateUsername:(state, action: PayloadAction<string>) => {
      state.value.username = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.value.email = action.payload;
    },
    updateImage:(state, action: PayloadAction<string>) => {
      state.value.image = action.payload;
    },
    updateAge:(state, action: PayloadAction<number>) => {
      state.value.age = action.payload
    },
    updateGender:(state, action: PayloadAction<string>) => {
      state.value.gender = action.payload;
    },
    



    addPlace: (state, action: PayloadAction<string>) => {
      state.value.userplaces.push(action.payload);
    },
    removePlace: (state, action) => {
      state.value.userplaces = state.value.userplaces.filter(e => e.userplaces !== action.payload);
    },
    importUserPlaces: (state, action) => {
      state.value.userplaces.push(action.payload);
    },
  },
});

export const { updateFirstname,updateUsername,updateEmail,updateImage,updateAge,updateGender, addPlace, removePlace, importUserPlaces } = userSlice.actions;
export default userSlice.reducer;
