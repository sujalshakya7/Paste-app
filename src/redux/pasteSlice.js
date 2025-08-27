import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
pastes:localStorage.getItem("pastes") ?
    JSON.parse(localStorage.getItem("pastes")):[]
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      const paste=action.payload; //action ko payload ma vako data lai paste ma store gare
      state.pastes.push(paste)//hame sanga vako paste ma naya ako paste add gareko ("pastes" chai
                              // hame sanga vako paste " yo paste" chai naya paste)
      //localStorage ma store gareko                        
      localStorage.setItem("pastes",JSON.stringify(state.pastes));//key="pastes" value=state.pastes
      toast.success("Paste created successfully");
    },
    updateToPastes: (state,action) => {
      const paste=action.payload//payload bata paste lai nikaleko
      const index=state.pastes.findIndex((item)=>
      item._id===paste._id)//jun paste update garne ho tyo hamro state ma kata xa khojeko ani tesko
                          // index leko
      if(index>=0){//index negavite ayo ki tyo index state ma xaina
        state.pastes[index]=paste// valid index xa vae paste lai state ma update garne
        localStorage.setItem("pastes",JSON.stringify(state.pastes));//tei paste lai localStorage ma 
        toast.success("Paste updated");                             //pani update garbe 
      }
     
    },
    resetAllPastes: (state, action) => {
      state.pastes=[];//reset garb lai state lai empty array sanga equal garne
      localStorage.removeItem("pastes");//localStorage lai ni empty garne 
                                        //"pastes" wala key lai remove garera 
     
    },
    removeFromPastes:(state,action)=>{  
      const pasteId=action.payload;
      console.log(pasteId);
      const index=state.pastes.findIndex((item)=>
      item._id===pasteId);//jun paste remove garne tesko index khojeko state bata

      if(index >=0){//index exit xa ki xaina here
        state.pastes.splice(index, 1);//jun paste delete garne ho tyo paste matra
                                      //state bata delete gareko
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste deleted");
      }
      

    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes,removeFromPastes} = pasteSlice.actions

export default pasteSlice.reducer