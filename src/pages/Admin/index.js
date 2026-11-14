import React, { useEffect, useState } from 'react'
import './admin.css'
import { signOut } from 'firebase/auth'
import { auth, db } from '../../firebaseconnection'
import { toast } from 'react-toastify'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where
} from 'firebase/firestore'
export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState({})

  const [tarefas, setTarefas] = useState([])

  useEffect(() => {
    async function loadTarefas() {
      const userDetails = localStorage.getItem('@detailsUser')
      setUser(JSON.parse(userDetails))

      if (userDetails) {
        const data = JSON.parse(userDetails)

        const tarefasRef = collection(db, 'tarefas')
        const q = query(
          tarefasRef,
          orderBy('create', 'desc'),
          where('uid', '==', data?.uid)
        )
        const unsub = onSnapshot(q, snapshot => {
          let list = []
          snapshot.forEach(doc => {
            list.push({
              id: doc.id,
              tarefa: doc.data().tarefas,
              userUid: doc.data().uid
            })
          })

          console.log(list)
          setTarefas(list)
        })
      }
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

  async function deleteTarefa(id) {
    const docRef = doc(db, 'tarefas', id)
    await deleteDoc(docRef)
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

      {tarefas.map(item => (
        <article className="list">
          <p>{item.tarefa}</p>
          <div>
            <button>Editar</button>
            <button
              className="btn-excluir"
              onClick={() => deleteTarefa(item.id)}
            >
              {' '}
              Excluir
            </button>
          </div>
        </article>
      ))}

      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  )
}
