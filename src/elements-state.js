import { v4 as uuid } from 'uuid'
import produce from 'immer'
import randomColor from 'randomcolor'
import { atom, useAtom } from 'jotai'
import { atomFamily, useUpdateAtom } from 'jotai/utils'

export {
  addElement,
  removeElement,
  startDrag,
  stopDrag,
  drag,
  useElementIds,
  useElement,
  useDispatch,
}

const elementIdsAtom = atom([])

function useElementIds() {
  return useAtom(elementIdsAtom)
}

const elementsAtomFamily = atomFamily(() => undefined)

function useElement(id) {
  return useAtom(elementsAtomFamily(id))
}

function useDispatch() {
  return useUpdateAtom(dispatchSelector)
}

const dragElementAtom = atom({
  draggingId: null, // if null, it means no elements are being dragged
  diffX: null,
  diffY: null,
})

// action types
const ADD_ELEMENT = 'ADD_ELEMENT'
const REMOVE_ELEMENT = 'REMOVE_ELEMENT'
const START_DRAG = 'START_DRAG'
const STOP_DRAG = 'STOP_DRAG'
const DRAG = 'DRAG'

const dispatchSelector = atom(
  null, // only using this selector to combine setters
  (get, set, action) => {
    // create some handlers
    const setElementIds = (recipe) => set(elementIdsAtom, produce(recipe))
    const setElement = (id, recipe) =>
      set(elementsAtomFamily(id), produce(recipe))
    const setDragElement = (recipe) => set(dragElementAtom, produce(recipe))

    switch (action.type) {
      case ADD_ELEMENT: {
        const newId = uuid()
        setElementIds((draft) => void draft.push(newId))
        setElement(newId, () => createElement(action.x, action.y))
        break
      }
      case REMOVE_ELEMENT: {
        setElementIds((draft) => {
          const { id } = action
          const elementIdx = draft.findIndex((elementId) => elementId === id)
          // bail if element doesn't exist
          if (elementIdx === -1) return
          elementsAtomFamily.remove(id) // remove the reference from memory
          draft.splice(elementIdx, 1)
        })
        break
      }
      case START_DRAG: {
        const { id, x, y } = action
        const element = get(elementsAtomFamily(id))
        // bail if element doesn't exist
        if (element === undefined) return
        // get the diff from where the user clicked and where the element starts
        const diffX = x - element.x
        const diffY = y - element.y
        setDragElement(() => ({ draggingId: id, diffX, diffY }))
        break
      }
      case STOP_DRAG: {
        setDragElement(() => ({ draggingId: null, diffX: null, diffY: null }))
        break
      }
      case DRAG: {
        const { draggingId, diffX, diffY } = get(dragElementAtom)
        // bail if not dragging
        if (draggingId === null) break
        const element = get(elementsAtomFamily(draggingId))
        // bail if element doesn't exist
        if (element === undefined) return
        const { x, y } = action
        setElement(draggingId, (draft) => {
          Object.assign(draft, {
            x: Math.round(x - diffX),
            y: Math.round(y - diffY),
          })
        })
        break
      }
      default: {
        throw Error(`Uncaught action of type ${action.type}`)
      }
    }
  }
)

const DEFAULT_WIDTH = 75
const DEFAULT_HEIGHT = 75
function createElement(x, y) {
  return {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    x: Math.round(x - DEFAULT_WIDTH / 2),
    y: Math.round(y - DEFAULT_WIDTH / 2),
    color: randomColor(),
  }
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
