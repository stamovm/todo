import type { NextPage } from 'next'
import Head from 'next/head'
import { useRef } from 'react'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const inputRef = useRef(null)
  function handleAdd(e) {
    if (e.key === 'Enter') {
      console.log('add : ', e.target.value)
      inputRef.current.value = ''
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

        <div className="pb-10 text-xl">
          <input type="checkbox" name="my" id="label1" />
          &nbsp;
          <label htmlFor="label1">Item</label>
        </div>

        <div className="p-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Add todo"
            className="p-2 border-2 rounded"
            onKeyDown={handleAdd}
          />
        </div>
      </main>
    </>
  )
}

export default Home
