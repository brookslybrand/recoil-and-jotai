import React from 'react'

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <Header />

      <Main>
        <Sidebar></Sidebar>
        <Canvas></Canvas>
      </Main>
    </div>
  )
}

function Header() {
  return (
    <header className="flex items-center bg-indigo-700 px-4 py-2">
      <h1 className="text-3xl text-gray-200 leading-none">Recoil and Jotai</h1>
    </header>
  )
}

function Main({ children }) {
  return (
    <main className="flex-1 flex flex-row overflow-hidden">{children}</main>
  )
}

function Sidebar({ children }) {
  return (
    <aside className="static inset-y-0 left-0 w-64 bg-gray-900 overflow-y-auto">
      {children}
    </aside>
  )
}

function Canvas({ children }) {
  return (
    <section className="flex-1 overflow-x-hidden overflow-y-hidden bg-gray-200">
      {children}
    </section>
  )
}
