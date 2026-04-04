import { db } from '@/app/api/services/firebase'
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  const cookieStore = await cookies()
  const uid = cookieStore.get('user-uid')?.value

  if (!uid) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const contactsRef = collection(db, 'contacts')
    const q = query(contactsRef, where('userId', '==', uid), orderBy('name'))
    const snapshot = await getDocs(q)

    const contacts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({ contacts })
  } catch {
    return NextResponse.json(
      { error: 'Erro ao buscar contatos.' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const uid = cookieStore.get('user-uid')?.value

  if (!uid) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const { name, email, phone } = await request.json()

    if (!name) {
      return NextResponse.json(
        { error: 'Nome é obrigatório.' },
        { status: 400 },
      )
    }

    const contactsRef = collection(db, 'contacts')
    const docRef = await addDoc(contactsRef, {
      userId: uid,
      name,
      email: email || '',
      phone: phone || '',
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      contact: { id: docRef.id, name, email: email || '', phone: phone || '' },
    })
  } catch {
    return NextResponse.json(
      { error: 'Erro ao criar contato.' },
      { status: 500 },
    )
  }
}
