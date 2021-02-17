import React, { useState } from 'react'
import { Redirect } from "react-router-dom"
import translateServerErrors from "../../services/translateServerErrors.js"
import Logic from './Logic.js'

const currentDate = new Date

const NewEvent = props => {
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

  const addNewEvent = async (eventPayload) => {
    try {
      const response = await fetch(`/api/v1/events/`, {
        method: "POST",
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
    return <Redirect to="/" />
  }

  return (
    <Logic
    eventRecord={eventRecord}
    setEventRecord={setEventRecord}
    submitRecord={addNewEvent}
    errors={errors}
    currentDate={currentDate}
    formName='Submit a New Event!'
    />
  )
}

export default NewEvent
