import React, { useEffect, useReducer, useRef, useState } from 'react'

export default function Canvas() {
  const [ref, { top, left }] = useTopLeft()

  return (
    <section ref={ref} className="w-full h-full bg-gray-200">
      <Draggable top={top} left={left} />
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
const STOP_DRAG = 'STOP_DRAG'
const DRAG = 'DRAG'

function dragReducer(state, action) {
  switch (action.type) {
    case START_DRAG: {
      return { ...state, status: 'dragging' }
    }
    case STOP_DRAG: {
      return { ...state, status: 'idle' }
    }
    case DRAG: {
      if (state.status === 'dragging') {
        const { x, y } = action
        return { ...state, x, y }
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
function Draggable({ top, left }) {
  const [{ x, y }, dispatch] = useReducer(dragReducer, initialDragState)
  const width = 50
  const height = 50

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
        dispatch({ type: START_DRAG })
      }}
      onMouseUp={(e) => {
        e.preventDefault()
        dispatch({ type: STOP_DRAG })
      }}
      onMouseMove={(e) => {
        e.preventDefault()
        const { clientX, clientY } = e
        dispatch({
          type: DRAG,
          y: clientY - top - height / 2,
          x: clientX - left - width / 2,
        })
      }}
      onMouseLeave={(e) => {
        e.preventDefault()
        dispatch({ type: STOP_DRAG })
      }}
    />
  )
}
