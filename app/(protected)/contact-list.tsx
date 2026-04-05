'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { ValidationError } from 'yup'
import { contactSchema, formatPhone } from '@/lib/validations'
import { Pencil, Trash2, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Contact {
  id: string
  name: string
  email: string
  phone: string
}

export function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Contact | null>(null)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  async function fetchContacts() {
    try {
      const res = await fetch('/api/contacts')
      const data = await res.json()
      if (res.ok) {
        setContacts(data.contacts)
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  function openCreateDialog() {
    setEditing(null)
    setFormName('')
    setFormEmail('')
    setFormPhone('')
    setFormError('')
    setFormErrors({})
    setDialogOpen(true)
  }

  function openEditDialog(contact: Contact) {
    setEditing(contact)
    setFormName(contact.name)
    setFormEmail(contact.email)
    setFormPhone(contact.phone)
    setFormError('')
    setFormErrors({})
    setDialogOpen(true)
  }

  function handlePhoneChange(value: string) {
    setFormPhone(formatPhone(value))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError('')
    setFormErrors({})

    try {
      await contactSchema.validate(
        { name: formName, email: formEmail, phone: formPhone },
        { abortEarly: false },
      )
    } catch (err) {
      if (err instanceof ValidationError) {
        const fieldErrors: Record<string, string> = {}
        err.inner.forEach((e) => {
          if (e.path) fieldErrors[e.path] = e.message
        })
        setFormErrors(fieldErrors)
        return
      }
    }

    setSaving(true)

    try {
      const url = editing ? `/api/contacts/${editing.id}` : '/api/contacts'
      const method = editing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setFormError(data.error)
        return
      }

      if (editing) {
        setContacts((prev) =>
          prev.map((c) => (c.id === editing.id ? data.contact : c))
        )
      } else {
        setContacts((prev) =>
          [...prev, data.contact].sort((a, b) => a.name.localeCompare(b.name))
        )
      }

      setDialogOpen(false)
    } catch {
      setFormError('Erro de conexão. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setContacts((prev) => prev.filter((c) => c.id !== id))
      }
    } catch {
      // silently fail
    } finally {
      setDeleteConfirm(null)
    }
  }

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  )

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <p className="text-muted-foreground">Carregando contatos...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar contatos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Contato
        </Button>
      </div>

      {contacts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            Nenhum contato cadastrado ainda.
          </p>
          <Button variant="link" onClick={openCreateDialog} className="mt-2">
            Adicionar seu primeiro contato
          </Button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            Nenhum contato encontrado para &quot;{search}&quot;.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="w-24 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email || '—'}</TableCell>
                  <TableCell>{contact.phone || '—'}</TableCell>
                  <TableCell className="text-right">
                    {deleteConfirm === contact.id ? (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(contact.id)}
                        >
                          Confirmar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteConfirm(null)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(contact)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm(contact.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? 'Editar Contato' : 'Novo Contato'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="contact-name">Nome *</Label>
              <Input
                id="contact-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Nome do contato"
              />
              {formErrors.name && (
                <p className="text-sm text-destructive">{formErrors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="email@exemplo.com"
              />
              {formErrors.email && (
                <p className="text-sm text-destructive">{formErrors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Telefone</Label>
              <Input
                id="contact-phone"
                value={formPhone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="(00) 00000-0000"
              />
              {formErrors.phone && (
                <p className="text-sm text-destructive">{formErrors.phone}</p>
              )}
            </div>
            {formError && (
              <p className="text-sm text-destructive">{formError}</p>
            )}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Salvando...' : editing ? 'Salvar' : 'Criar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
