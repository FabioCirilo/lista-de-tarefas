import React, { useState } from 'react'
import './admin.css'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseconnection'
export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('')

  function handleRegister(e) {
    e.preventDefault()
    alert('Teste')
  }

  async function handleLogout() {
    await signOut(auth)
  }

  return (
    <div className="admin-container">
      <h1>Minhas tarefas</h1>

      <form className="forms" onSubmit={handleRegister}>
        <textarea
          type="text"
          value={tarefaInput}
          onChange={e => setTarefaInput(e.target.value)}
          placeholder="Digite sua tarefa"
        />
        <button className="btn-register" type="submit">
          Registrar
        </button>
      </form>

      <article className="list">
        <p>Estudar javaScript e reactjs hoje a noite</p>
        <div>
          <button>Editar</button>
          <button className="btn-excluir"> Excluir</button>
        </div>
      </article>

      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  )
}
