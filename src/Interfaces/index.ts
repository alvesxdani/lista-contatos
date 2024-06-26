import { DocumentData } from "firebase/firestore";

// Define a user type that includes the Firebase user object
export interface IUser {
  id: string
  email: string
  displayName: string | null
  photoURL: string | null
}

export interface IAuthState {
  user: IUser | null;
}

export interface IAuthForm {
  email: string
  password: string
}

export interface INewContactForm {
  name: string
  email: string
  phone: string
}

export interface IDataItem {
  id: string
  data: DocumentData
}[]

export interface IContatos {
  items: IDataItem[]
}