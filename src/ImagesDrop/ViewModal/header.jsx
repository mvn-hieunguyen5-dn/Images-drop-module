import React from 'react'

export default function Header({tittle , onTurnOff}) {
  return (
    <div className='header'>
      <p>{tittle}</p>
      <div className='flex-space'></div>
      <div className='action-bar'>
        <button className="turn-off" onClick={()=>onTurnOff()}></button>
      </div>
    </div>
  )
}
