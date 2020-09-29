import React, { useEffect, useReducer, useRef, useState } from 'react'

const STOP_DRAG = 'STOP_DRAG'

export default function Canvas() {
  const [ref, { top, left }] = useTopLeft()
  const [{ x, y }, dispatch] = useReducer(dragReducer, initialDragState)

  return (
    <section
      ref={ref}
      className="w-full h-full bg-gray-200"
      onMouseLeave={(e) => {
        e.preventDefault()
        dispatch({ type: STOP_DRAG })
      }}
      onMouseMove={(e) => {
        e.preventDefault()
        dispatch({
          type: DRAG,
          x: e.clientX - left,
          y: e.clientY - top,
        })
      }}
      onMouseUp={(e) => {
        e.preventDefault()
        dispatch({ type: STOP_DRAG })
      }}
    >
      <Draggable top={top} left={left} x={x} y={y} dispatch={dispatch} />
    </section>
  )
}

function useTopLeft() {
  const [{ top, left }, setDimensions] = useState({ top: null, left: null })
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current === null) return
    const handleResize = () => {
      const { x, y } = ref.current.getBoundingClientRect()

      setDimensions((prev) => {
        // if nothing changed, don't update the values
        if (y === prev.top && x === prev.left) {
          return prev
        }
        return { top: y, left: x }
      })
    }
    handleResize() // find the initial values
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })

  return [ref, { top, left }]
}

// action types
const START_DRAG = 'START_DRAG'

const DRAG = 'DRAG'

function dragReducer(state, action) {
  switch (action.type) {
    case START_DRAG: {
      const { diffX, diffY } = action
      return { ...state, status: 'dragging', diffX, diffY }
    }
    case STOP_DRAG: {
      return { ...state, status: 'idle', diffX: null, diffY: null }
    }
    case DRAG: {
      if (state.status === 'dragging') {
        const { diffX, diffY } = state
        const { x, y } = action
        return { ...state, x: x - diffX, y: y - diffY }
      }
      return state
    }
    default: {
      throw Error(`Uncaught action of type ${action.type}`)
    }
  }
}

const initialDragState = {
  status: 'idle', // one of ['dragging', 'idle']
  x: 50,
  y: 50,
}
function Draggable({ top, left, x, y, dispatch }) {
  const width = 75
  const height = 75

  if (top === null || left === null) return null

  return (
    <div
      className="relative cursor-move cursor"
      style={{
        top: y,
        left: x,
        width,
        height,
        backgroundColor: 'blue',
      }}
      onMouseDown={(e) => {
        e.preventDefault()
        const { clientY, clientX } = e

        const diffX = clientX - left - x
        const diffY = clientY - top - y

        dispatch({ type: START_DRAG, diffX, diffY })
      }}
      // onMouseUp={(e) => {
      //   e.preventDefault()
      //   dispatch({ type: STOP_DRAG })
      // }}
      // onMouseMove={(e) => {
      //   e.preventDefault()
      //   const { clientX, clientY } = e
      //   dispatch({
      //     type: DRAG,
      //     y: clientY - top - height / 2,
      //     x: clientX - left - width / 2,
      //   })
      // }}
      // onMouseLeave={(e) => {
      //   e.preventDefault()
      //   dispatch({ type: STOP_DRAG })
      // }}
    />
  )
}
