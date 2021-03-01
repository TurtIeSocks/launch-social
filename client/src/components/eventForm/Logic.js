import React, { useState, useEffect } from 'react'
import Fetch from '../../services/fetch/Fetch.js'
import Form from './Form.js'

const FormLogic = ({
  eventRecord,
  submitRecord,
  errors,
  setEventRecord,
  currentDate,
  formName }) => {
  const [inputValue, setInputValue] = useState(null)
  const [eventTypes, setEventTypes] = useState([])
  const [studyTopics, setStudyTopics] = useState([])

  const fetchTypesAndTopics = async () => {
    const body = await Fetch.typesAndTopics()
    setEventTypes([{ key: 0, label: "Select One", value: 0 }, ...body.eventTypes])
    setStudyTopics(body.studyTopics)
  }

  const loadGames = (inputValue) => {
    return Fetch.fetchGames(inputValue)
  }

  useEffect(() => {
    fetchTypesAndTopics()
  }, [])

  const handleChange = (event) => {
    if (event.currentTarget.name) {
      setEventRecord({
        ...eventRecord,
        [event.currentTarget.name]: event.currentTarget.value,
      })
    } else {
      setEventRecord({
        ...eventRecord,
        eventTypeId: event.target.value,
      })
    }
  }

  const handleStartDateChange = (date) => {
    setEventRecord({
      ...eventRecord,
      startDate: date.getTime(),
    })
  }

  const handleEndDateChange = (date) => {
    setEventRecord({
      ...eventRecord,
      endDate: date.getTime(),
    })
  }

  const handleInputChange = value => {
    setInputValue(value)
  }

  const handleGameDetailsChange = value => {
    setEventRecord({
      ...eventRecord,
      gameDetails: value
    })
  }

  const handleStudyTopicChange = value => {
    setEventRecord({
      ...eventRecord,
      studyTopic: value
    })
  }

  const fieldReset = () => {
    setEventRecord({
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
  }

  const clearForm = (event) => {
    event.preventDefault()
    fieldReset()
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    submitRecord(eventRecord)
    fieldReset()
  }

  return (
    <Form
      eventRecord={eventRecord}
      eventTypes={eventTypes}
      studyTopics={studyTopics}
      onSubmitHandler={onSubmitHandler}
      handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange}
      handleChange={handleChange}
      handleInputChange={handleInputChange}
      handleGameDetailsChange={handleGameDetailsChange}
      handleStudyTopicChange={handleStudyTopicChange}
      clearForm={clearForm}
      loadGames={loadGames}
      errors={errors}
      formName={formName}
    />
  )
}

export default FormLogic
