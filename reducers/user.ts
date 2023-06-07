import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  value: {
    token: string | null;
    firstname: string | null;
    username: string | null;
    email: string | null;
    image: string | null;
    age: number | null;
    gender: string | null;
    userplaces: [];
    datebirth: Date | null;
  };
}

const initialState: UserState = {
  value: {
    token: null,
    firstname: null,
    username: null,
    email: null,
    image: null,
    age: null,
    gender: null,
    userplaces: [],
    datebirth: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.firstname = action.payload;
      state.value.username = action.payload;
      state.value.email = action.payload;
      state.value.age = action.payload;
      state.value.gender = action.payload;
      state.value.datebirth = action.payload;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.firstname = null;
      state.value.username = null;
      state.value.email = null;
      state.value.image = null;
      state.value.age = null;
      state.value.gender = null;
      state.value.datebirth = null;
    },
    updateFirstname: (state, action: PayloadAction<string>) => {
      state.value.firstname = action.payload;
    },
    updateToken: (state, action) => {
      state.value.token = action.payload;
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      state.value.username = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.value.email = action.payload;
    },
    updateImage: (state, action) => {
      state.value.image = action.payload;
    },
    updateAge: (state, action) => {
      state.value.age = action.payload;
    },
    updateGender: (state, action: PayloadAction<string>) => {
      state.value.gender = action.payload;
    },
    updateDatebirth: (state, action) => {
      state.value.datebirth = action.payload;
    },

    addPlace: (state, action) => {
      state.value.userplaces.push(action.payload);
    },
    removePlace: (state, action) => {
      state.value.userplaces = state.value.userplaces.filter((e) => e !== action.payload);
    },
    importUserPlaces: (state, action: PayloadAction<string[]>) => {
      state.value.userplaces = action.payload;
    },
  },
});

export const {
  login,
  logout,
  updateFirstname,
  updateUsername,
  updateEmail,
  updateImage,
  updateAge,
  updateGender,
  addPlace,
  removePlace,
  importUserPlaces,
  updateDatebirth,
  updateToken,
} = userSlice.actions;

export default userSlice.reducer;
