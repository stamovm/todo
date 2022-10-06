import type { NextPage } from 'next'
import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/react'
import { trpc } from '../utils/trpc'
import { useRef } from 'react'

const Home: NextPage = () => {
  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery()
  const inputRef = useRef<HTMLInputElement>(null)
  const { data } = trpc.todo.getAll.useQuery()
  const client = trpc.useContext()
  const { data: session } = useSession()

  const create = trpc.todo.create.useMutation({
    onSuccess: () => {
      client.todo.getAll.invalidate()
      if (!inputRef.current) return
      inputRef.current.value = ''
    },
  })

  const check = trpc.todo.updateChecked.useMutation({
    onSuccess: () => {
      client.todo.getAll.invalidate()
    },
  })
  const del = trpc.todo.delete.useMutation({
    onSuccess: () => {
      client.todo.getAll.invalidate()
    },
  })

  function handleCheck(e: { target: HTMLInputElement }) {
    check.mutate({ id: e.target.id, checked: e.target.checked })
  }

  return (
    <>
      <Head>
        <title>Web App</title>
        <meta name="description" content="Todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col items-center  min-h-screen p-4 mx-auto">
        <button
          className="px-4 py-2 border border-black text-xl rounded-md bg-violet-50 hover:bg-violet-100 shadow-lg'"
          onClick={session ? () => signOut() : () => signIn()}
        >
          {session ? 'Sign out' : 'Sign in'}
        </button>
        {session && (
          <>
            <p className="text-2xl text-blue-500">
              Logged in as {session?.user?.name}
            </p>
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
          </>
        )}
        {session && secretMessage && (
          <p className="text-2xl text-blue-500">This: {secretMessage}</p>
        )}
      </main>
    </>
  )
}

export default Home
