import React, { useState } from 'react'

const GAS_URL =
  'https://script.google.com/macros/s/AKfycbx6V3P0cjrdqkUqmeKuphPLWPN9kDSrnlO-OX-2VbH-P_23SPUfzK40CGLZ7p9quXQ/exec'

type FormState = { name: string; email: string; message: string }
type FormErrors = { name?: string; email?: string; message?: string }

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
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!emailRegex.test(form.email)) newErrors.email = 'Valid email is required'
    if (!form.message.trim()) newErrors.message = 'Please enter a message'
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
      setGeneralError('Network error. Please try again.')
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
            placeholder="Your name"
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
            placeholder="Email or social link"
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
          placeholder="Write your message here..."
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
          {sending ? 'Sending...' : 'Send Message'}
        </button>
      </div>

      {generalError && (
        <div
          id="form-status"
          role="status"
          aria-live="polite"
          className="nes-text is-error"
          style={{ marginTop: '.75rem', textAlign: 'center' }}
        >
          {generalError}
        </div>
      )}
    </form>
  )
}
