import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props): React.ReactElement => {
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

      <header>
        <nav className="flex h-12 items-center justify-between px-4 shadow-md">
          <Link href="/">
            <a className="pl-14 text-lg font-bold">Todo List</a>
          </Link>
          <div>
            <Link href="/settings">
              <a className="p-2">Settings</a>
            </Link>
            <Link href="/login">
              <a className="p-2">Login</a>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto flex min-h-screen flex-col items-center p-4">
        {children}
      </main>

      <footer className="flex h-10 items-center justify-center shadow-inner">
        Todo List
      </footer>
    </>
  );
};

export default Layout;
