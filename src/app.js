import React from 'react'
import { Provider } from 'jotai'
import { Canvas, Draggable } from './canvas'
import ElementInputs from './element-inputs'

import { useElementIds } from './elements-state'

export default function App() {
  return (
    <Provider>
      <div className="flex flex-col h-screen">
        <Header />

        <div className="flex-1 flex flex-row overflow-hidden">
          <Content />
        </div>
      </div>
    </Provider>
  )
}

function Content() {
  const [elementIds] = useElementIds()

  return (
    <>
      <Sidebar>
        <div className="px-4 py-4">
          {elementIds.map((id, idx) => (
            <ElementInputs key={id} id={id} title={`Element ${idx + 1}`} />
          ))}
        </div>
      </Sidebar>
      <Main>
        <Canvas>
          {elementIds.map((id) => (
            <Draggable key={id} id={id} />
          ))}
          {elementIds.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <h2 className="text-2xl text-gray-800 select-none">
                Double Click to add an element
              </h2>
            </div>
          ) : null}
        </Canvas>
      </Main>
    </>
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
