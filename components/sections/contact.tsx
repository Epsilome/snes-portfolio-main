import React, { useRef, useState, useEffect } from "react"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const form = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState("")

  useEffect(() => {
    // initialize EmailJS once
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)
  }, [])

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

    if (!serviceID || !templateID) {
      console.error("EmailJS configuration is missing")
      setStatus("Configuration error. Please contact the administrator.")
      return
    }

    try {
      await emailjs.sendForm(serviceID, templateID, form.current!)
      setStatus("Message sent successfully!")
      form.current?.reset()
    } catch (err: any) {
      console.error("EmailJS error:", err)
      setStatus(`Failed to send: ${err.text || err.message}`)
    }
  }

  return (
    <div className="snes-box">
      <h2 className="snes-text">Contact Me</h2>
      <form ref={form} onSubmit={sendEmail} className="snes-form">
        {/* hidden recipient name */}
        <input type="hidden" name="to_name" value="Your Name" />

        <label>
          Your Name:
          {/* template expects from_name */}
          <input type="text" name="from_name" className="snes-input" required />
        </label>

        <label>
          Your Email:
          {/* template expects user_email */}
          <input type="email" name="user_email" className="snes-input" required />
        </label>

        <label>
          Message:
          <textarea name="message" className="snes-input" required />
        </label>

        <button type="submit" className="snes-button">
          Send
        </button>
      </form>

      {status && <p className="mt-4">{status}</p>}
    </div>
  )
}
