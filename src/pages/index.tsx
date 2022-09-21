import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef } from 'react'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { data } = trpc.useQuery(['todo.getAll'])
  const client = trpc.useContext()

  const { mutate, isLoading } = trpc.useMutation('todo.createTodo', {
    onSuccess: (data) => {
      console.log('success data: ', data)
      client.invalidateQueries(['todo.getAll'])
      if (!inputRef.current) return
      inputRef.current.value = ''
    },
  })

  function handleAdd(e: { target: HTMLInputElement; key: string }) {
    if (e.key === 'Enter') {
      console.log('add : ', e.target.value)
      mutate({ text: e.target.value })
    }
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
                  className="  text-xl text-teal-500 hover:text-teal-700 duration-300"
                >
                  <input type="checkbox" name="my" id={todo.id} />

                  <label htmlFor={todo.id}> {todo.text}</label>
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
            onKeyDown={handleAdd}
            disabled={isLoading}
          />
        </div>
      </main>
    </>
  )
}

export default Home
