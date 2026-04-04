import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })

  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })

  response.cookies.set('user-name', '', {
    path: '/',
    maxAge: 0,
  })

  response.cookies.set('user-uid', '', {
    path: '/',
    maxAge: 0,
  })

  return response
}
