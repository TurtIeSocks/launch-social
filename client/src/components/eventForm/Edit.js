import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import Logic from './Logic.js'
import Fetch from '../../services/fetch/Fetch.js'

const currentDate = new Date

const EditEvent = props => {
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

  const fetchEvent = async (eventId) => {
    setEventRecord(await Fetch.fetchEditEvent(eventId))
  }

  useEffect(() => {
    fetchEvent(eventId)
  }, [])

  const EditEvent = async (eventPayload) => {
    setErrors(await Fetch.editEvent(eventId))
    setShouldRedirect(true)
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

export default EditEvent
