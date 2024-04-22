import { DocumentData, collection, getDocs } from 'firebase/firestore'
import { IDataItem } from '../Interfaces'
import { useAppDispatch, useAppSelector } from './useApp'
import { db } from '../services/firebase'
import { fetchItens } from '../store/reducers/contatos'

export const useFetchItens = () => {
  const { items } = useAppSelector((state) => state.contatos)
  const dispatch = useAppDispatch()

  async function fetchContatos() {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'))
      const dataItems: IDataItem[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
      dispatch(fetchItens(dataItems))
    } catch (error) {
      console.error('Error fetching documents', error)
      throw error
    }
  }
  return { items, fetchContatos }
}
