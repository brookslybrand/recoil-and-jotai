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

function ElementInputs({ id, title, x, y, width, height, color, dispatch }) {
  const handleChangeElementAttributes = (attributes) =>
    dispatch(changeElementAttributes({ id, ...attributes }))

  // generate ids for all of the label and forms
  const xFormId = `${id}-x`
  const yFormId = `${id}-y`
  const widthFormId = `${id}-width`
  const heightFormId = `${id}-height`
  const colorFormId = `${id}-color`

  return (
    <div className="grid grid-cols-auto-2 gap-y-2 gap-x-1 mt-4">
      <h2 className="col-span-2 text-white text-xl">{title}</h2>
      <label htmlFor={xFormId} className="text-white">
        x:{' '}
      </label>
      <input
        id={xFormId}
        className="text-black"
        type="number"
        min="0"
        value={x}
        onChange={(e) =>
          handleChangeElementAttributes({ x: Number(e.target.value) })
        }
      />
      <label htmlFor={yFormId} className="text-white">
        y:{' '}
      </label>
      <input
        id={yFormId}
        className="text-black"
        type="number"
        min="0"
        value={y}
        onChange={(e) =>
          handleChangeElementAttributes({ y: Number(e.target.value) })
        }
      />
      <label htmlFor={widthFormId} className="text-white">
        width:{' '}
      </label>
      <input
        id={widthFormId}
        className="text-black"
        type="number"
        min="0"
        value={width}
        onChange={(e) =>
          handleChangeElementAttributes({ width: Number(e.target.value) })
        }
      />
      <label htmlFor={heightFormId} className="text-white">
        height:{' '}
      </label>
      <input
        id={heightFormId}
        className="text-black"
        type="number"
        min="0"
        value={height}
        onChange={(e) =>
          handleChangeElementAttributes({ height: Number(e.target.value) })
        }
      />
      <label htmlFor={colorFormId} className="text-white">
        color:{' '}
      </label>
      <input
        id={colorFormId}
        className="text-black"
        type="color"
        value={color}
        onChange={(e) =>
          handleChangeElementAttributes({ color: e.target.value })
        }
      />
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
