import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef } from 'react'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { data } = trpc.useQuery(['todo.getAll'])
  const client = trpc.useContext()

  const create = trpc.useMutation('todo.create', {
    onSuccess: () => {
      client.invalidateQueries(['todo.getAll'])
      if (!inputRef.current) return
      inputRef.current.value = ''
    },
  })
  const check = trpc.useMutation('todo.updateChecked', {
    onSuccess: () => {
      client.invalidateQueries(['todo.getAll'])
    },
  })
  const del = trpc.useMutation('todo.delete', {
    onSuccess: () => {
      client.invalidateQueries(['todo.getAll'])
    },
  })

  function handleCheck(e: { target: HTMLInputElement }) {
    check.mutate({ id: e.target.id, checked: e.target.checked })
  }

  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name="todo list" content="todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center  min-h-screen p-4">
        <h1 className="pb-10 text-3xl  leading-normal font-bold text-teal-700">
          Todo List
        </h1>

        <div className="p-3 border rounded">
          <div className="pb-5 text-xl">
            {data ? (
              data.map((todo) => (
                <div
                  key={todo.id}
                  className="text-xl pb-2 text-teal-500 hover:text-teal-700 duration-300"
                >
                  <input
                    type="checkbox"
                    name="my"
                    id={todo.id}
                    onChange={handleCheck}
                    checked={todo.checked}
                  />
                  <label htmlFor={todo.id}> {todo.text}</label>
                  <button
                    className="bg-gray-200 hover:bg-gray-400  text-red-900 font-bold mx-2 px-2 rounded inline-flex items-center duration-300"
                    data-id={todo.id}
                    onClick={(e) => {
                      del.mutate({ id: e.currentTarget.dataset.id || '' })
                    }}
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <p className="animate-bounce">Loading..</p>
            )}
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Add todo"
            className="p-2 border-2 rounded"
            disabled={create.isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                create.mutate({ text: e.currentTarget.value })
              }
            }}
          />
        </div>
      </main>
    </>
  )
}

export default Home
