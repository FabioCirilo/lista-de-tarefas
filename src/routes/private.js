import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../firebaseconnection'
import { Navigate } from 'react-router-dom'

export default function Private({ children }) {
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false)

  useEffect(() => {
    async function checkLogin() {
      const unsub = onAuthStateChanged(auth, user => {
        // Se estiver logado
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email
          }

          localStorage.setItem('@detailsUser', JSON.stringify(userData))

          setLoading(false)
          setSigned(true)
        } else {
          setLoading(false)
          setSigned(false)
        }
      })
    }

    checkLogin()
  }, [])

  if (loading) {
    return (
      <div>
        <span>Carregando...</span>
      </div>
    )
  }

  if (!signed) {
    return <Navigate to="/" />
  }

  return children
}
