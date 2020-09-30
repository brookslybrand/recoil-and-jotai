import React, { useState } from 'react'
import {
  addElement,
  startDrag,
  stopDrag,
  drag,
  removeElement,
} from './elements-state'

export default function Canvas({ elements = [], dispatch }) {
  const hasElements = elements.length > 0
  return (
    <section
      className="w-full h-full bg-gray-200"
      onDoubleClick={(e) => {
        dispatch(addElement({ x: e.clientX, y: e.clientY }))
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
            dispatch(
              startDrag({ id, diffX: e.clientX - x, diffY: e.clientY - y })
            )
          }}
          onDelete={() => dispatch(removeElement({ id }))}
        />
      ))}
      {!hasElements ? (
        <div className="w-full h-full flex items-center justify-center">
          <h2 className="text-2xl text-gray-800 select-none">
            Double Click to add an element
          </h2>
        </div>
      ) : null}
    </section>
  )
}

function Draggable({ top, left, width, height, color, onMouseDown, onDelete }) {
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
      onClick={(e) => {
        e.stopPropagation()

        e.nativeEvent.stopImmediatePropagation()
      }}
    >
      <CloseButton
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
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
