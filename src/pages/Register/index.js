import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from '../../firebaseconnection'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()

    if (email !== '' && password !== '') {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/admin', { replace: true })
        })
        .catch(() => {
          console.log('Usuario nao cadastrado')
        })
    } else {
      toast.warn('Todos os campos são obrigatorios')
    }
  }

  return (
    <div className="home-container">
      <h1>Cadastre-se</h1>
      <span>Vamos criar sua conta</span>

      <form className="forms" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Digite o seu email..."
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite a sua senha..."
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit"> Cadastrar </button>
      </form>
      <Link to="/" className="btn-link">
        já possui uma conta? faça o login
      </Link>
    </div>
  )
}
