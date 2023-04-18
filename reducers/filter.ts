import { createSlice } from '@reduxjs/toolkit';


  
const initialState = {
    value: {
    valeur: [],
    // start_date: null,
    // end_date: null,
    distance: 10000,
   
  
}}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.value.valeur = action.payload;
      console.log('filter',state.value.valeur)
      
    },
    addFilter2: (state, action) => {
        state.value.distance = action.payload;
        console.log('filter2',state.value.distance)
    
  }
}
});

export const { addFilter, addFilter2 } = filterSlice.actions;
export default filterSlice.reducer;
