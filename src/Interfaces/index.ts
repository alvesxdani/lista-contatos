// Define a user type that includes the Firebase user object
export interface IUser {
  id: string
  email: string
  displayName: string | null
  photoURL: string | null
}

export interface IAuthForm {
  email: string
  password: string
}