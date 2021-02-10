import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ErrorList from "../ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"

const today = new Date

const NewEventForm = (props) => {
  const [months, setMonths] = useState([])
  const [years, setYears] = useState([])
  const [eventTypes, setEventTypes] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState([])
  const [eventRecord, setEventRecord] = useState({
    name: "",
    description: "",
    location: "",
    url: "",
    meetUrl: "",
    imageUrl: "",
    eventTypeId: "",
    gameName: "",
    maxPlayers: "2",
    studyTopic: "",
    otherType: "",
    yearId: "",
    monthId: "",
    day: today.getDate(),
    hour: today.getHours(),
    minute: "0",
    duration: "1",
    repeats: "false",
    alerts: "false"
  })

  const fetchCalendarInfo = async () => {
    try {
      const response = await fetch(`/api/v1/basics`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setMonths(body.months)
      setYears(body.years)
      setEventTypes([{ name: "", id: "" }, ...body.eventTypes])
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchCalendarInfo()
  }, [])

  useEffect(() => {
    let currentYearId
    let currentMonthId
    years.forEach(year => {
      if (year.year === today.getFullYear()) {
        currentYearId = year.id
        months.forEach(month => {
          if (today.getMonth() === 1) {
            if (month.jsValue === today.getMonth()) {
              currentMonthId = year % 4 === 0 ? "3" : "2"
            }
          } else {
            if (month.jsValue === today.getMonth()) {
              currentMonthId = month.id
            }
          }
        })
      }
    })

    setEventRecord({ ...eventRecord, yearId: currentYearId, monthId: currentMonthId })
  }, [years])

  const availYears = years.map(year => {
    return (
      <option key={year.id} value={year.id}>
        {year.year}
      </option>
    )
  })

  const availMonths = months.map(month => {
    if (eventRecord.yearId !== '' && eventRecord.yearId !== undefined) {
      if (years[eventRecord.yearId - 1].leapYear && month.id !== "2") {
        return (
          <option key={month.id} value={month.id}>
            {month.name}
          </option>
        )
      } else if (!years[eventRecord.yearId - 1].leapYear && month.id !== "3") {
        return (
          <option key={month.id} value={month.id}>
            {month.name}
          </option>
        )
      }
    }
  })

  const availDays = []
  const availHours = []
  const availMinutes = []

  const durations = [15, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "All Day"]
  const availDurations = []

  for (let i = 0; i < 60; i++) {
    if (eventRecord.monthId !== '' && eventRecord.monthId !== undefined && i !== 0 && i <= months[eventRecord.monthId - 1].numOfDays) {
      if (eventRecord.yearId)
        availDays.push(<option key={i} value={i}>{i}</option>)
    }
    if (i < 24) {
      let usaFriendlyTime = i < 12 ? `${i} AM` : i === 12 ? `${i} PM` : `${i - 12} PM`
      availHours.push(<option key={i} value={i}>{usaFriendlyTime}</option>)
    }
    if (i % 5 === 0) {
      let cleanMinutes = i < 10 ? `0${i}` : i
      availMinutes.push(<option key={i} value={i}>{cleanMinutes}</option>)
    }
    if (i < durations.length) {
      if (durations[i] < 13) {
        if (durations[i] === 1) {
          availDurations.push(<option key={i} value={durations[i]}>{`${durations[i]} Hour`}</option>)
        } else {
          availDurations.push(<option key={i} value={durations[i]}>{`${durations[i]} Hours`}</option>)
        }
      } else if (durations[i] > 13) {
        availDurations.push(<option key={i} value={durations[i]}>{`${durations[i]} Minutes`}</option>)
      } else {
        availDurations.push(<option key={i} value={24}>{`${durations[i]}`}</option>)
      }
    }
  }
  const availEventTypes = eventTypes.map(eventType => {
    return (
      <option key={eventType.id} value={eventType.id}>
        {eventType.name}
      </option>
    )
  })


  const handleInputChange = (event) => {
    setEventRecord({
      ...eventRecord,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const fieldReset = () => {
    setEventRecord({
      name: "",
      description: "",
      location: "",
      url: "",
      meetUrl: "",
      imageUrl: "",
      eventTypeId: "",
      gameName: "",
      maxPlayers: "",
      studyTopic: "",
      otherType: "",
      yearId: "",
      monthId: "",
      day: today.getDate(),
      hour: today.getHours(),
      minute: 0,
      duration: 0,
      repeats: false,
      alerts: false
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    addNewEvent(eventRecord)
    fieldReset()
  }

  const clearForm = (event) => {
    event.preventDefault()
    fieldReset()
  }

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

  const specialFields = []
  if (eventRecord.eventTypeId === "1") {
    specialFields.push(
      <div key={eventRecord.eventTypeId}>
        <label htmlFor="gameName">
          Game Name:
        </label>
        <input type="text"
          id="gameName"
          name="gameName"
          onChange={handleInputChange}
          value={eventRecord.gameName}
        />
        <label htmlFor="maxPlayers">
          Max Number of Players:
        </label>
        <input type="text"
          id="maxPlayers"
          name="maxPlayers"
          onChange={handleInputChange}
          value={eventRecord.maxPlayers}
        />
      </div>
    )
  } else if (eventRecord.eventTypeId === "2") {
    specialFields.push(
      <div key={eventRecord.eventTypeId}>
        <label htmlFor="studyTopic">
          Study Session Topic:
        </label>
        <input type="text"
          id="studyTopic"
          name="studyTopic"
          onChange={handleInputChange}
          value={eventRecord.studyTopic}
        />
      </div>
    )
  } else if (eventRecord.eventTypeId === "3") {
    specialFields.push(
      <div key={eventRecord.eventTypeId}>
        <label htmlFor="otherType">
          Set Your Own Event Type:
        </label>
        <input type="text"
          id="otherType"
          name="otherType"
          onChange={handleInputChange}
          value={eventRecord.otherType}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>Add a New Event</h1>
      <ErrorList errors={errors} />
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="name">
          Name:
        </label>
        <input type="text"
          id="name"
          name="name"
          onChange={handleInputChange}
          value={eventRecord.name}
        />

        <label htmlFor="description">
          Description:
        </label>
        <input
          type="text"
          name="description"
          id="description"
          onChange={handleInputChange}
          value={eventRecord.description}
        />

        <label htmlFor="location">
          Location:
        </label>
        <input
          type="text"
          name="location"
          id="location"
          onChange={handleInputChange}
          value={eventRecord.location}
        />

        <label htmlFor="meetUrl">
          Virtual Meeting URL:
        </label>
        <input
          type="text"
          name="meetUrl"
          id="meetUrl"
          onChange={handleInputChange}
          value={eventRecord.meetUrl}
        />

        <label htmlFor="imageUrl">
          Image URL:
        </label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          onChange={handleInputChange}
          value={eventRecord.imageUrl}
        />

        <label htmlFor="url">
          Additional Info URL:
        </label>
        <input
          type="text"
          name="url"
          id="url"
          onChange={handleInputChange}
          value={eventRecord.url}
        />

        <label htmlFor="eventTypeId">
          Event Type:
            </label>
        <select
          name="eventTypeId"
          onChange={handleInputChange}
          value={eventRecord.eventTypeId}>
          {availEventTypes}
        </select>

        {specialFields}

        <label htmlFor="yearId">
          Year:
            </label>
        <select
          name="yearId"
          onChange={handleInputChange}
          value={eventRecord.yearId}>
          {availYears}
        </select>

        <label htmlFor="monthId">
          Month:
            </label>
        <select
          name="monthId"
          onChange={handleInputChange}
          value={eventRecord.monthId}>
          {availMonths}
        </select>

        <label htmlFor="day">
          Day:
            </label>
        <select
          name="day"
          onChange={handleInputChange}
          value={eventRecord.day}>
          {availDays}
        </select>

        <label htmlFor="hour">
          Hour:
            </label>
        <select
          name="hour"
          onChange={handleInputChange}
          value={eventRecord.hour}>
          {availHours}
        </select>

        <label htmlFor="minute">
          Minute:
            </label>
        <select
          name="minute"
          onChange={handleInputChange}
          value={eventRecord.minute}>
          {availMinutes}
        </select>

        <label htmlFor="duration">
          Duration:
            </label>
        <select
          name="duration"
          onChange={handleInputChange}
          value={eventRecord.duration}>
          {availDurations}
        </select>

        <div className="button-group">
          <button className="button" onClick={clearForm}>
            Clear
          </button>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default NewEventForm
