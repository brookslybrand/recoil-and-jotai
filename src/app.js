import React from 'react'
import Canvas from './canvas'

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex-1 flex flex-row overflow-hidden">
        <Sidebar>
          <div className="flex flex-col px-4 py-4 space-y-2">
            {/* <label className="text-white">
              X:{' '}
              <input
                className="text-black"
                type="number"
                value={x}
                onChange={(e) =>
                  dispatch({ type: CHANGE_POSITION, x: Number(e.target.value) })
                }
              />
            </label>
            <label className="text-white">
              Y:{' '}
              <input
                className="text-black"
                type="number"
                value={y}
                onChange={(e) =>
                  dispatch({ type: CHANGE_POSITION, y: Number(e.target.value) })
                }
              />
            </label> */}
          </div>
        </Sidebar>
        <Main>
          <Canvas />
        </Main>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="flex items-center bg-indigo-700 px-4 py-2 z-10">
      <h1 className="text-3xl text-gray-200 leading-none">
        Recoil Jotai Comparison
      </h1>
    </header>
  )
}

function Main({ children }) {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-hidden z-0">
      {children}
    </main>
  )
}

function Sidebar({ children }) {
  return (
    <aside className="static inset-y-0 left-0 w-64 bg-gray-900 overflow-y-auto z-10">
      {children}
    </aside>
  )
}
