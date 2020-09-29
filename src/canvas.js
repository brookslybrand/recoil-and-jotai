import React from 'react'
import { addElement, startDrag, stopDrag, drag } from './elements-state'

export default function Canvas({ elements, dispatch }) {
  return (
    <section
      className="w-full h-full bg-gray-200"
      onClick={(e) => {
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
