import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IContatos, IDataItem, IUser } from '../../Interfaces'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../services/firebase'

const initialState: IContatos = {
  items: [],
}


export const contatosSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {
    fetchItens: (state, action: PayloadAction<IDataItem[]>) => {
      state.items = action.payload
    },
  },
})

export const { fetchItens } = contatosSlice.actions
export default contatosSlice.reducer
