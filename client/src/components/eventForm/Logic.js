import React, { useState, useEffect } from 'react'
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

  const fetchEventTypes = async () => {
    try {
      const response = await fetch(`/api/v1/basics`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      const eventTypes = body.eventTypes.map(eventType => {
        return { key: eventType.id, label: eventType.name, value: eventType.id }
      })
      setEventTypes([{ key: 0, label: "Select One", value: 0 }, ...eventTypes])
    } catch (error) {
      console.error(error.message)
    }
  }

  const loadGames = (inputValue) => {
    return fetch(`/api/v1/games/names?search=${inputValue}`).then(res => res.json())
  };

  useEffect(() => {
    fetchEventTypes()
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
  };

  const handleEndDateChange = (date) => {
    setEventRecord({
      ...eventRecord,
      endDate: date.getTime(),
    })
  };

  const handleInputChange = value => {
    setInputValue(value)
  };

  const handleGameDetailsChange = value => {
    setEventRecord({
      ...eventRecord,
      gameDetails: value
    })
  }

  const fieldReset = () => {
    setEventRecord({
      name: "",
      description: "",
      location: "",
      meetUrl: "",
      eventTypeId: 0,
      gameDetails: { id: 0, name: 'Search for the game you want to play...' },
      studyTopic: "",
      otherType: "",
      startDate: currentDate.getTime(),
      endDate: currentDate.getTime(),
      repeats: "",
      alerts: "",
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
      onSubmitHandler={onSubmitHandler}
      handleStartDateChange={handleStartDateChange}
      handleEndDateChange={handleEndDateChange}
      handleChange={handleChange}
      handleInputChange={handleInputChange}
      handleGameDetailsChange={handleGameDetailsChange}
      clearForm={clearForm}
      loadGames={loadGames}
      errors={errors}
      formName={formName}
    />
  );
}

export default FormLogic