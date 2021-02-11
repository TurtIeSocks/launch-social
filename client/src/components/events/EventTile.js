import React from "react"
import { Link } from 'react-router-dom'

const EventTile = ({ event }) => {
  return (
    <div>
      <Link to={`/events/${event.id}`}><div className='callout'>{event.name}</div></Link>
    </div>
  )
}

export default EventTile