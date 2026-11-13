import React, { useState } from 'react'
import './home.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseconnection'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    if (email !== '' && password !== '') {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // Navegar para o login
          navigate('/admin', { replace: true })
        })
        .catch(() => {
          console.log('Erro ao efectuar o login')
        })
    } else {
      toast.warn('Preencha todos os campos')
    }
  }

  return (
    <div className="home-container">
      <h1>Lista de tarefas</h1>
      <span>Gerencie sua agenda de forma simples</span>

      <form className="forms" onSubmit={handleLogin}>
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
        <button type="submit"> Entrar </button>
      </form>
      <Link to="/register" className="btn-link">
        Não possui uma conta? Cadastra-se
      </Link>
    </div>
  )
}
