import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
    valeur: [5,60],
    distance: 10000,
    modale:true, 
}}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.value.valeur = action.payload;
      
    },
    addFilter2: (state, action) => {
        state.value.distance = action.payload;
    
  },
  addModale:(state, action) => {
    state.value.modale = action.payload },
}
});

export const { addFilter, addFilter2, addModale } = filterSlice.actions;
export default filterSlice.reducer;
