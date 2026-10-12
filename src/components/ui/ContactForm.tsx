import React, { useState } from 'react'

const GAS_URL =
  'https://script.google.com/macros/s/AKfycbx6V3P0cjrdqkUqmeKuphPLWPN9kDSrnlO-OX-2VbH-P_23SPUfzK40CGLZ7p9quXQ/exec'

type FormState = { name: string; email: string; message: string }
type FormErrors = { name?: string; email?: string; message?: string }

const CONTACT_EMAIL = 'hi.fernanddo@gmail.com'

const emailRegex = /\S+@\S+\.\S+/

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [sending, setSending] = useState(false)
  const [generalError, setGeneralError] = useState('')

  const handleChange =
    (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }))
      if (errors[k]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[k]
          return newErrors
        })
      }
    }

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {}
    if (!form.name.trim()) newErrors.name = 'What should I call you?'
    if (!emailRegex.test(form.email)) newErrors.email = "That email doesn't look right"
    if (!form.message.trim()) newErrors.message = "Don't leave me hanging, say something!"
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError('')
    
    const validationErrors = validate()
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSending(true)
    try {
      // text/plain keeps this a "simple" CORS request (no preflight, which Apps Script
      // doesn't answer) while still letting us read the status, unlike mode: 'no-cors'
      const res = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          mensaje: form.message
        })
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      // The script answers 200 even when it fails, with { status: 'error' }
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)
      window.location.assign('/thanks')
    } catch {
      setGeneralError('error')
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="c-inputs">
        <div className="form-control input-half">
          <label htmlFor="name" style={{ color: errors.name ? '#e76e55' : 'inherit' }}>Name</label>
          <input
            type="text"
            id="name"
            name="sender-name"
            placeholder="What's your name?"
            className={`input-field nes-input ${errors.name ? 'is-error' : ''}`}
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange('name')}
          />
          {errors.name && (
            <span className="nes-text is-error" style={{ fontSize: '0.7rem' }}>{errors.name}</span>
          )}
        </div>

        <div className="form-control input-half">
          <label htmlFor="email" style={{ color: errors.email ? '#e76e55' : 'inherit' }}>Email</label>
          <input
            type="email"
            id="email"
            name="sender-email"
            placeholder="you@email.com"
            className={`input-field nes-input ${errors.email ? 'is-error' : ''}`}
            required
            autoComplete="email"
            inputMode="email"
            value={form.email}
            onChange={handleChange('email')}
          />
          {errors.email && (
             <span className="nes-text is-error" style={{ fontSize: '0.7rem' }}>{errors.email}</span>
          )}
        </div>
      </div>

      <div className="form-control">
        <label htmlFor="message" style={{ color: errors.message ? '#e76e55' : 'inherit' }}>Message</label>
        <textarea
          id="message"
          cols={3}
          rows={4}
          placeholder="What's on your mind?"
          name="message"
          className={`input-field nes-textarea ${errors.message ? 'is-error' : ''}`}
          required
          value={form.message}
          onChange={handleChange('message')}
        />
        {errors.message && (
           <span className="nes-text is-error" style={{ fontSize: '0.7rem' }}>{errors.message}</span>
        )}
      </div>

      <div className="c-submit-btn">
        <button
          type="submit"
          id="submit-btn"
          className="nes-btn is-error submit-btn"
          disabled={sending}
          aria-busy={sending}
        >
          {sending ? 'Sending...' : 'Send it'}
        </button>
      </div>

      {/* Always rendered so screen readers announce the error when it appears */}
      <div
        id="form-status"
        role="status"
        aria-live="polite"
        className="nes-text is-error"
        style={{ marginTop: '.75rem', textAlign: 'center' }}
      >
        {generalError && (
          <>
            Oops, that didn't go through. Try again or hit me up at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </>
        )}
      </div>
    </form>
  )
}
