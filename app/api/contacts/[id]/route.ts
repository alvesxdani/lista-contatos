import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { db } from '@/app/api/services/firebase'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies()
  const uid = cookieStore.get('user-uid')?.value

  if (!uid) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const { id } = await params
    const { name, email, phone } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Nome é obrigatório.' }, { status: 400 })
    }

    const contactRef = doc(db, 'contacts', id)
    const contactSnap = await getDoc(contactRef)

    if (!contactSnap.exists() || contactSnap.data().userId !== uid) {
      return NextResponse.json({ error: 'Contato não encontrado.' }, { status: 404 })
    }

    await updateDoc(contactRef, { name, email: email || '', phone: phone || '' })

    return NextResponse.json({
      contact: { id, name, email: email || '', phone: phone || '' },
    })
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar contato.' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies()
  const uid = cookieStore.get('user-uid')?.value

  if (!uid) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const { id } = await params
    const contactRef = doc(db, 'contacts', id)
    const contactSnap = await getDoc(contactRef)

    if (!contactSnap.exists() || contactSnap.data().userId !== uid) {
      return NextResponse.json({ error: 'Contato não encontrado.' }, { status: 404 })
    }

    await deleteDoc(contactRef)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erro ao excluir contato.' }, { status: 500 })
  }
}
