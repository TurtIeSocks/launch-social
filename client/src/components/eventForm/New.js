import React, { useState } from 'react'
import { Redirect } from "react-router-dom"
import Logic from './Logic.js'
import Fetch from '../../services/fetch/Fetch.js' 

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
    const body = await Fetch.newEvent(eventPayload)
    body ? setErrors(body) : setShouldRedirect(true)
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
