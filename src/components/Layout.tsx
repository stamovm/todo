import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props): React.ReactElement => {
  const { data: session } = useSession();

  useEffect(() => {
    const keyDownHandler = (e: { key: string }) => {
      // if (e.key === 'Escape') toggleSidebar()
      // console.log(`You pressed ${e.key}`)
    };
    document.addEventListener("keydown", keyDownHandler);
    // clean up
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Todo</title>
        <meta name="description" content="Todo list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col">
        <header>
          <nav className="flex h-10 items-center justify-between px-4 text-teal-700 shadow-md">
            <Link href="/">
              <a className=" text-lg font-bold">Todo List</a>
            </Link>
            <div>
              {/* <Link href="/settings">
              <a className="p-2">Settings</a>
            </Link> */}
              <span> {session?.user?.name} </span>
              <a
                className="ml-2 cursor-pointer font-semibold transition delay-300 duration-300 ease-in hover:text-teal-900 "
                onClick={session ? () => signOut() : () => signIn()}
              >
                {" "}
                {session ? "Sign out" : "Sign in"}
              </a>
            </div>
          </nav>
        </header>

        <main className="container mx-auto flex  flex-col items-center p-4">
          {children}
        </main>

        <footer className="mt-auto flex h-10 items-center justify-center shadow-inner">
          Todo List
        </footer>
      </div>
    </>
  );
};

export default Layout;
