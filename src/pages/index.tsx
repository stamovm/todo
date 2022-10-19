import type { NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { useRef } from "react";

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { data: session } = useSession();
  const { data: myTodos } = trpc.todo.getTodos.useQuery();

  const create = trpc.todo.create.useMutation({
    onSuccess: () => {
      client.todo.getTodos.invalidate();
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });

  const check = trpc.todo.updateChecked.useMutation({
    onSuccess: () => {
      client.todo.getTodos.invalidate();
    },
  });
  const del = trpc.todo.delete.useMutation({
    onSuccess: () => {
      client.todo.getTodos.invalidate();
    },
  });

  function handleCheck(e: { target: HTMLInputElement }) {
    check.mutate({ id: e.target.id, checked: e.target.checked });
  }

  if (!session) return <h2>Please sign in</h2>;
  return (
    <>
      <div className="rounded-md border border-teal-500 p-3">
        <div className="mb-2 text-xl">
          {myTodos ? (
            myTodos.map((todo) => (
              <div
                key={todo.id}
                className="mb-1 flex  items-center  justify-between text-xl text-teal-500 duration-300 ease-in hover:text-teal-700 "
              >
                <div>
                  <input
                    className="h-4  w-4 rounded-md border accent-teal-500  hover:cursor-pointer"
                    type="checkbox"
                    name="my"
                    id={todo.id}
                    onChange={handleCheck}
                    checked={todo.checked}
                  />
                  <label className="hover:cursor-pointer" htmlFor={todo.id}>
                    &nbsp;
                    {todo.text}
                  </label>
                </div>
                <button
                  className="ml-2 inline-flex items-center rounded-md border border-teal-500 bg-teal-50 px-2 text-sm font-bold text-red-900 duration-300 hover:bg-teal-500 hover:text-red-700"
                  data-id={todo.id}
                  onClick={(e) => {
                    del.mutate({ id: e.currentTarget.dataset.id || "" });
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
          className="w-full rounded-md border border-teal-500 p-2"
          disabled={create.isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              create.mutate({ text: e.currentTarget.value });
            }
          }}
        />
      </div>
    </>
  );
};

export default Home;
