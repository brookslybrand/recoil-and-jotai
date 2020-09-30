import React from 'react'

import { changeElementAttributes } from './elements-state'

export default function ElementInputs({
  id,
  title,
  x,
  y,
  width,
  height,
  color,
  dispatch,
}) {
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
