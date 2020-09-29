import React, { useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import produce from 'immer'

// action types
const ADD_ELEMENT = 'ADD_ELEMENT'
const START_DRAG = 'START_DRAG'
const STOP_DRAG = 'STOP_DRAG'
const DRAG = 'DRAG'

const DEFAULT_WIDTH = 75
const DEFAULT_HEIGHT = 75
function createElement(x, y) {
  return {
    id: uuid(),
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    x: x - DEFAULT_WIDTH / 2,
    y: y - DEFAULT_WIDTH / 2,
    color: 'blue',
  }
}

const elementsReducer = produce((draft, action) => {
  switch (action.type) {
    case ADD_ELEMENT: {
      const newElement = createElement(action.x, action.y)
      draft.elements.push(newElement)
      break
    }
    case START_DRAG: {
      const { id, diffX, diffY } = action
      const element = draft.elements.find((element) => element.id === id)
      // bail if element doesn't exist
      if (element === undefined) return
      Object.assign(draft, { draggingId: id, diffX, diffY })
      break
    }
    case STOP_DRAG: {
      Object.assign(draft, { draggingId: null, diffX: null, diffY: null })
      break
    }
    case DRAG: {
      const { draggingId, diffX, diffY } = draft
      // bail if not dragging
      if (draggingId === null) break
      const element = draft.elements.find(({ id }) => id === draggingId)
      // bail if element doesn't exist
      if (element === undefined) return
      const { x, y } = action
      Object.assign(element, { x: x - diffX, y: y - diffY })
      break
    }
    default: {
      throw Error(`Uncaught action of type ${action.type}`)
    }
  }
})

const initialState = {
  draggingId: null, // if null, it means no elements are being dragged
  diffX: null,
  diffY: null,
  elements: [],
}

export default function Canvas() {
  const [{ elements }, dispatch] = useReducer(elementsReducer, initialState)

  return (
    <section
      className="w-full h-full bg-gray-200"
      onClick={(e) => {
        dispatch({ type: ADD_ELEMENT, x: e.clientX, y: e.clientY })
      }}
      onMouseLeave={(e) => {
        e.preventDefault()
        dispatch({ type: STOP_DRAG })
      }}
      onMouseMove={(e) => {
        e.preventDefault()
        dispatch({
          type: DRAG,
          x: e.clientX,
          y: e.clientY,
        })
      }}
      onMouseUp={(e) => {
        e.preventDefault()
        dispatch({ type: STOP_DRAG })
      }}
    >
      {elements.map(({ id, x, y, width, height, color }) => (
        <Draggable
          key={id}
          top={y}
          left={x}
          width={width}
          height={height}
          color={color}
          onMouseDown={(e) => {
            e.preventDefault()
            dispatch({
              type: START_DRAG,
              id,
              diffX: e.clientX - x,
              diffY: e.clientY - y,
            })
          }}
        />
      ))}
    </section>
  )
}

function Draggable({ top, left, width, height, color, onMouseDown }) {
  return (
    <div
      className="absolute cursor-move cursor overflow-hidden"
      style={{
        top,
        left,
        width,
        height,
        backgroundColor: color,
      }}
      onMouseDown={onMouseDown}
      onClick={(e) => e.stopPropagation()}
    />
  )
}
