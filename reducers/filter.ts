import { createSlice } from '@reduxjs/toolkit';


  
const initialState = {
    value: {
    valeur: [5,60],
    // start_date: null,
    // end_date: null,
    distance: 10000,
    modale:true,
   
  
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
    
  },
  addModale:(state, action) => {
    state.value.modale = action.payload;
    console.log('modale',state.value.modale)

},
}
});

export const { addFilter, addFilter2, addModale } = filterSlice.actions;
export default filterSlice.reducer;
