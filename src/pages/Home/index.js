import React, { useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(e) {
    e.preventDefault()

    if (email !== '' && password !== '') {
      alert('Teste')
    } else {
      alert('Preencha todos os campos')
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
