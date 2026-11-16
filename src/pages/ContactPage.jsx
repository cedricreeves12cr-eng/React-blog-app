import { useState } from 'react'

function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    alert('Message submitted!')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="contact-page">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />

        <button type="submit">Send Message</button>
      </form>
    </div>
  )
}

export default ContactPage