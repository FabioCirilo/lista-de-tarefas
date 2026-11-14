import React, { useEffect, useState } from 'react'
import './admin.css'
import { signOut } from 'firebase/auth'
import { auth, db } from '../../firebaseconnection'
import { toast } from 'react-toastify'
import { addDoc, collection } from 'firebase/firestore'
export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {
    async function loadTarefas() {
      const userDetails = localStorage.getItem('@detailsUser')
      setUser(JSON.parse(userDetails))
    }

    loadTarefas()
  }, [])

  async function handleRegister(e) {
    e.preventDefault()
    if (tarefaInput === '') {
      toast.warn('Digite uma tarefa')
      return
    }

    await addDoc(collection(db, 'tarefas'), {
      tarefas: tarefaInput,
      create: new Date(),
      uid: user?.uid
    })
      .then(() => {
        toast.success('Tarefa registrada')
        setTarefaInput('')
      })
      .catch(err => {
        console.log('Erro ao registar ' + err)
      })
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
