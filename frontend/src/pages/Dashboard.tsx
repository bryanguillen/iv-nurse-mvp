import { useEffect, useState } from 'react'
import { supabase } from '../config/supabase'

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        console.log(data.session.access_token)
        setEmail(data.session.user.email || null)
      }
    })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      {email ? (
        <h1 className="text-xl font-bold">👋 Welcome, {email}</h1>
      ) : (
        <h1 className="text-xl font-bold">⚠️ Not authenticated</h1>
      )}
    </div>
  )
}
