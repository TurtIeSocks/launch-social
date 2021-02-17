import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import translateServerErrors from "../../services/translateServerErrors.js"
import Logic from './Logic.js'

const currentDate = new Date

const Edit = props => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [eventRecord, setEventRecord] = useState({
    name: "",
    description: "",
    location: "",
    meetUrl: "",
    eventTypeId: "",
    gameDetails: { id: 0, name: 'Search for the game you want to play...' },
    studyTopic: {},
    imageUrl: "",
    otherType: "",
    startDate: currentDate.getTime(),
    endDate: currentDate.getTime(),
    repeats: "false",
    alerts: "false",
  })

  const { id: eventId } = props.match.params

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/v1/events/${eventId}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      const startDate = new Date(parseInt(body.event.startDate))
      const endDate = new Date(parseInt(body.event.endDate))
      for ( const [key, value] of Object.entries(body.event)) {
        if (key === 'alerts') body.event[key] = 'false'
        if (key === 'repeats') body.event[key] = 'false'
        if (body.event[key] === null) body.event[key] = ''
      }
      if (body.event.studyTopic) {
        for ( const [key, value] of Object.entries(body.event.studyTopic)) {
          if (key === 'id') body.event.studyTopic.value = value
          if (key === 'name') body.event.studyTopic.label = value
        }  
      }
      setEventRecord({...body.event, eventTypeId: body.event.eventType.id, startDate, endDate})
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchEvent()
  }, [])

  const EditEvent = async (eventPayload) => {
    try {
      const response = await fetch(`/api/v1/events/${eventId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(eventPayload),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        setErrors([])
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  if (shouldRedirect) {
    return <Redirect to={`/events/${eventId}`} />
  }

  return (
    <Logic
    eventRecord={eventRecord}
    setEventRecord={setEventRecord}
    submitRecord={EditEvent}
    errors={errors}
    currentDate={currentDate}
    formName='Edit Your Event'
    />
  )
}

export default Edit
