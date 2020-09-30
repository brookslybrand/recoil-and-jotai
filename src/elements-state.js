import { useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import produce from 'immer'
import randomColor from 'randomcolor'

export {
  useElements,
  addElement,
  removeElement,
  startDrag,
  stopDrag,
  drag,
  changeElementAttributes,
}

function useElements() {
  const [{ elements }, dispatch] = useReducer(elementsReducer, initialState)
  return [elements, dispatch]
}

// action types
const ADD_ELEMENT = 'ADD_ELEMENT'
const REMOVE_ELEMENT = 'REMOVE_ELEMENT'
const START_DRAG = 'START_DRAG'
const STOP_DRAG = 'STOP_DRAG'
const DRAG = 'DRAG'
const CHANGE_ELEMENT_ATTRIBUTES = 'CHANGE_ELEMENT_ATTRIBUTES'

const DEFAULT_WIDTH = 75
const DEFAULT_HEIGHT = 75
function createElement(x, y) {
  return {
    id: uuid(),
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    x: Math.round(x - DEFAULT_WIDTH / 2),
    y: Math.round(y - DEFAULT_WIDTH / 2),
    color: randomColor(),
  }
}

const elementsReducer = produce((draft, action) => {
  switch (action.type) {
    case ADD_ELEMENT: {
      const newElement = createElement(action.x, action.y)
      draft.elements.push(newElement)
      break
    }
    case REMOVE_ELEMENT: {
      const { id } = action
      const elementIdx = draft.elements.findIndex(
        (element) => element.id === id
      )
      // bail if element doesn't exist
      if (elementIdx === -1) return
      draft.elements.splice(elementIdx, 1)
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
      Object.assign(element, {
        x: Math.round(x - diffX),
        y: Math.round(y - diffY),
      })
      break
    }
    // change any attributes on the element
    case CHANGE_ELEMENT_ATTRIBUTES: {
      let { id, ...newAttributes } = action
      const element = draft.elements.find((element) => element.id === id)
      // bail if element doesn't exist
      if (element === undefined) return
      Object.assign(element, newAttributes)
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

// action creators

function addElement({ x, y }) {
  return { type: ADD_ELEMENT, x, y }
}

function removeElement({ id }) {
  return { type: REMOVE_ELEMENT, id }
}

function startDrag({ id, diffX, diffY }) {
  return { type: START_DRAG, id, diffX, diffY }
}

function stopDrag() {
  return { type: STOP_DRAG }
}

function drag({ x, y }) {
  return { type: DRAG, x, y }
}

function changeElementAttributes({ id, ...newAttributes }) {
  return { type: CHANGE_ELEMENT_ATTRIBUTES, id, ...newAttributes }
}
