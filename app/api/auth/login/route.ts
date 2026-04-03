import { NextRequest, NextResponse } from 'next/server'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/app/api/services/firebase'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios.' },
        { status: 400 }
      )
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const token = await userCredential.user.getIdToken()

    const response = NextResponse.json({
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      },
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error: unknown) {
    const firebaseErrorMap: Record<string, string> = {
      'auth/user-not-found': 'Usuário não encontrado.',
      'auth/wrong-password': 'Senha incorreta.',
      'auth/invalid-email': 'Email inválido.',
      'auth/user-disabled': 'Conta desativada.',
      'auth/invalid-credential': 'Credenciais inválidas.',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    }

    const code = (error as { code?: string }).code ?? ''
    const message = firebaseErrorMap[code] || 'Erro ao fazer login. Tente novamente.'

    return NextResponse.json({ error: message }, { status: 401 })
  }
}
