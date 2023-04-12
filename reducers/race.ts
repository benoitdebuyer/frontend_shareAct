import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RaceState = {
    value: {
      email: string | null;
      token: string | null,
      places: (string | number)[];
      photos: string[];

      
    };
  };


const initialState: RaceState = {
  value: { email: null, token: null, places: [], photos: [] },
};

export const raceSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
});

export const { } = raceSlice.actions;
export default raceSlice.reducer;
