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
  updateDoc,
  where
} from 'firebase/firestore'
export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState('')
  const [user, setUser] = useState({})

  const [tarefas, setTarefas] = useState([])
  const [edit, setEdit] = useState({})

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
        return () => unsub && unsub()
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

    if (edit?.id) {
      handleUpdateTarefa()
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

  async function editarTarefa(item) {
    setTarefaInput(item.tarefa)
    setEdit(item)
  }

  async function handleUpdateTarefa() {
    const docRef = doc(db, 'tarefas', edit?.id)
    await updateDoc(docRef, {
      tarefas: tarefaInput
    })
      .then(() => {
        toast.success('Tarefa atualizada')
        setTarefaInput('')
        setEdit({})
      })
      .catch(err => {
        console.log('Erro ao atualizar ' + err)
        setTarefaInput('')
        setEdit({})
      })
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
        {Object.keys(edit).length > 0 ? (
          <button
            className="btn-register"
            style={{ backgroundColor: '#6add39' }}
            type="submit"
          >
            Atualizar tarefa
          </button>
        ) : (
          <button className="btn-register" type="submit">
            Registrar tarefa
          </button>
        )}
      </form>

      {tarefas.map(item => (
        <article className="list">
          <p>{item.tarefa}</p>
          <div>
            <button onClick={() => editarTarefa(item)}>Editar</button>
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
