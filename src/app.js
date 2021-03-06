import React from 'react'
import Canvas from './canvas'
import ElementInputs from './element-inputs'

import { useElements } from './elements-state'

export default function App() {
  const [elements, dispatch] = useElements()

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex-1 flex flex-row overflow-hidden">
        <Sidebar>
          <div className="px-4 py-4">
            {elements.map(({ id, x, y, width, height, color }, idx) => (
              <ElementInputs
                key={id}
                id={id}
                title={`Element ${idx + 1}`}
                x={x}
                y={y}
                width={width}
                height={height}
                color={color}
                dispatch={dispatch}
              />
            ))}
          </div>
        </Sidebar>
        <Main>
          <Canvas elements={elements} dispatch={dispatch} />
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
