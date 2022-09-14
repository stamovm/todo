import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
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
          <input type="checkbox" name="my" id="" />
          items
        </div>
        <div className="rounded border-2 p-2">
          <input
            type="text"
            placeholder="Add todo"
            className="p-2 border-2 rounded"
          />
        </div>
      </main>
    </>
  )
}

export default Home
