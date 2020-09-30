import React from 'react'
import Canvas from './canvas'

import { useElements, changeElementAttributes } from './elements-state'

export default function App() {
  const [elements, dispatch] = useElements()

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex-1 flex flex-row overflow-hidden">
        <Sidebar>
          <div className="px-4 py-4">
            {elements.map(({ id, x, y, color }, idx) => (
              <ElementInputs
                key={id}
                id={id}
                title={`Element ${idx + 1}`}
                x={x}
                y={y}
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

function ElementInputs({ id, title, x, y, color, dispatch }) {
  const handleChangeElementAttributes = (attributes) =>
    dispatch(changeElementAttributes({ id, ...attributes }))
  return (
    <div className="flex flex-col justify-start mt-4 space-y-2">
      <h2 className="text-white text-xl">{title}</h2>
      <label className="text-white">
        x:{' '}
        <input
          className="text-black"
          type="number"
          value={x}
          onChange={(e) =>
            handleChangeElementAttributes({ x: Number(e.target.value) })
          }
        />
      </label>
      <label className="text-white">
        y:{' '}
        <input
          className="text-black"
          type="number"
          value={y}
          onChange={(e) =>
            handleChangeElementAttributes({ y: Number(e.target.value) })
          }
        />
      </label>
      <label className="text-white">
        color:{' '}
        <input
          className="text-black"
          type="color"
          value={color}
          onChange={(e) =>
            handleChangeElementAttributes({ color: e.target.value })
          }
        />
      </label>
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
