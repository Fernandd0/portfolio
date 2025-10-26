import React, { useState } from 'react'

const GAS_URL =
  'https://script.google.com/macros/s/AKfycbx6V3P0cjrdqkUqmeKuphPLWPN9kDSrnlO-OX-2VbH-P_23SPUfzK40CGLZ7p9quXQ/exec'

type FormState = { name: string; email: string; message: string }
const emailRegex = /\S+@\S+\.\S+/

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')

  const handleChange =
    (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    if (!form.name.trim()) return 'Ingresa tu nombre'
    if (!emailRegex.test(form.email)) return 'Ingresa un email válido'
    if (!form.message.trim()) return 'Escribe un mensaje'
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('')
    const err = validate()
    if (err) return setStatus(err)

    setSending(true)
    try {
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          mensaje: form.message
        })
      })
      window.location.assign('/thanks')
    } catch {
      setStatus('Error de red. Intenta nuevamente.')
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="c-inputs">
        <div className="form-control input-half">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="sender-name"
            placeholder="Your name"
            className="input-field nes-input"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange('name')}
          />
        </div>

        <div className="form-control input-half">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="sender-email"
            placeholder="Email or social link"
            className="input-field nes-input"
            required
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={handleChange('email')}
          />
        </div>
      </div>

      <div className="form-control">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          cols={3}
          rows={4}
          placeholder="Write your message here..."
          name="message"
          className="input-field nes-textarea"
          required
          value={form.message}
          onChange={handleChange('message')}
        />
      </div>

      <div className="c-submit-btn">
        <button
          type="submit"
          id="submit-btn"
          className="nes-btn is-error submit-btn"
          disabled={sending}
          aria-busy={sending}
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </div>

      {status && (
        <div
          id="form-status"
          role="status"
          aria-live="polite"
          className="form-status"
          style={{ marginTop: '.75rem' }}
        >
          {status}
        </div>
      )}
    </form>
  )
}
