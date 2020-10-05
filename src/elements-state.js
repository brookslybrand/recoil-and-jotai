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
      break
    }
    case REMOVE_ELEMENT: {
      break
    }
    case START_DRAG: {
      break
    }
    case STOP_DRAG: {
      break
    }
    case DRAG: {
      break
    }
    // change any attributes on the element
    case CHANGE_ELEMENT_ATTRIBUTES: {
      break
    }
    default: {
      throw Error(`Uncaught action of type ${action.type}`)
    }
  }
})

const initialState = {
  elements: [],
}

// action creators
function addElement({ x, y }) {
  return { type: ADD_ELEMENT, x, y }
}

function removeElement({ id }) {
  return { type: REMOVE_ELEMENT, id }
}

function startDrag({ id, x, y }) {
  return { type: START_DRAG, id, x, y }
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
