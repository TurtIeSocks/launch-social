import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

const EventTile = ({ event }) => {
  return (
    <div className='callout'>
      {event.name}
    </div>
  )
}

export default EventTile