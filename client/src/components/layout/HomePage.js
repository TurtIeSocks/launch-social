import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import EventTile from '../events/EventTile.js' 

const HomePage = props => {
  const [events, setEvents] = useState([])

  const fetchEvents = async () => {
    try {
      const response = await fetch(`/api/v1/events`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setEvents(body.events)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const allEvents = events.map(event => {
    return (
      <EventTile
        key={event.id}
        event={event}
        user={props.user}
      />
    )
  })

  return (
    <div>
      {allEvents}
    </div>
  )
}

export default HomePage