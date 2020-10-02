import React from 'react'
import {
  addElement,
  startDrag,
  stopDrag,
  drag,
  removeElement,
  useDispatch,
  useElement,
} from './elements-state'

export function Canvas({ elementIds = [], children }) {
  const dispatch = useDispatch()
  return (
    <section
      className="w-full h-full bg-gray-200"
      onDoubleClick={(e) => {
        const { left, top } = e.target.getBoundingClientRect()
        dispatch(addElement({ x: e.clientX - left, y: e.clientY - top }))
      }}
      onMouseLeave={(e) => {
        e.preventDefault()
        dispatch(stopDrag())
      }}
      onMouseMove={(e) => {
        e.preventDefault()
        dispatch(drag({ x: e.clientX, y: e.clientY }))
      }}
      onMouseUp={(e) => {
        e.preventDefault()
        dispatch(stopDrag())
      }}
    >
      {children}
    </section>
  )
}

export function Draggable({ id }) {
  const [{ x, y, width, height, color }] = useElement(id)
  const dispatch = useDispatch()

  return (
    <div
      className="absolute cursor-move cursor overflow-hidden"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width,
        height,
        backgroundColor: color,
      }}
      onMouseDown={(e) => {
        e.preventDefault()
        dispatch(startDrag({ id, x: e.clientX, y: e.clientY }))
      }}
      onClick={(e) => {
        e.stopPropagation()
      }}
      onDoubleClick={(e) => {
        e.stopPropagation()
      }}
    >
      <CloseButton
        onClick={(e) => {
          e.stopPropagation()
          dispatch(removeElement({ id }))
        }}
      />
    </div>
  )
}

// taken from https://heroicons.com/
function CloseButton({ onClick }) {
  return (
    <button
      className="rounded-full w-4 h-4 absolute top-0 right-0 bg-gray-300 border border-blue-600 hover:bg-gray-400 active:bg-gray-600 focus:border-blue-800 focus:border-2 focus:outline-none  "
      aria-label="remove element"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="black"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  )
}
