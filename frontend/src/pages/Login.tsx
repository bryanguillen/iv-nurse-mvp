import { useState } from 'react'
import { supabase } from '../config/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const sendMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/dashboard`,
      },
    })
    if (error) alert(error.message)
    else setSent(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Login with Magic Link</h1>
      {!sent ? (
        <>
          <input
            className="border p-2 rounded w-full max-w-xs mb-4"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={sendMagicLink}
          >
            Send Magic Link
          </button>
        </>
      ) : (
        <p>✅ Magic link sent! Check your email.</p>
      )}
    </div>
  )
}
