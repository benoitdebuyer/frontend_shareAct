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

  },
});

export const { } = userSlice.actions;
export default userSlice.reducer;
