import { NextRequest, NextResponse } from 'next/server'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/app/api/services/firebase'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios.' },
        { status: 400 }
      )
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    if (name) {
      await updateProfile(userCredential.user, { displayName: name })
    }

    const token = await userCredential.user.getIdToken()

    return NextResponse.json({
      token,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name || null,
      },
    })
  } catch (error: unknown) {
    const firebaseErrorMap: Record<string, string> = {
      'auth/email-already-in-use': 'Este email já está em uso.',
      'auth/invalid-email': 'Email inválido.',
      'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
      'auth/operation-not-allowed': 'Registro desativado.',
    }

    const code = (error as { code?: string }).code ?? ''
    const message = firebaseErrorMap[code] || 'Erro ao criar conta. Tente novamente.'

    return NextResponse.json({ error: message }, { status: 400 })
  }
}
