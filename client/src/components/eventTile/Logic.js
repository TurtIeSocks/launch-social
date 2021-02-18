import { Button, ThemeProvider } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import Tile from './Tile'
import theme from '../mui/theme.js' 

const TileLogic = ({ event, user }) => {
  const [userInterests, setUserInterests] = useState({
    isAttending: false,
    isInterested: false
  })
  const [totalInterests, setTotalInterests] = useState({
    attending: event.totalAttending.value,
    interested: event.totalInterests.value
  })

  let upVoteButtonClass = 'default'
  if (userInterests.isAttending) {
    upVoteButtonClass = 'primary'
  }

  let downVoteButtonClass = 'default'
  if (userInterests.isInterested) {
    downVoteButtonClass = 'secondary'
  }

  const isActiveEvent = event => {
    let isActive = 'card'
    const currentDate = (new Date).getTime()
    if (event.startDate < currentDate && event.endDate > currentDate) {
      isActive = 'activeCard'
    }
    return isActive
  }

  useEffect(() => {
    event.userInterests.forEach(interest => {
      if (user && interest.userId === user.id) {
        getUserInterestState(interest.value)
      }
    })
  }, [])

  const getUserInterestState = value => {
    let state = { isAttending: false, isInterested: true }
    if (value && value === 'attending') {
      state = { isAttending: true, isInterested: false }
    }
    return setUserInterests(state)
  }

  const newInterest = async (interestPayload) => {
    try {
      const response = await fetch(`/api/v1/events/${event.id}/interests`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(interestPayload)
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      getUserInterestState(body.interest.value)
      setTotalInterests({ attending: body.totalAttending.value, interested: body.totalInterested.value })
    } catch (error) {
      console.error(error.message)
    }
  }

  const editInterest = async (interestPayload) => {
    try {
      const response = await fetch(`/api/v1/events/${event.id}/interests`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(interestPayload)
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      getUserInterestState(body.interest.value)
      setTotalInterests({ attending: body.totalAttending.value, interested: body.totalInterested.value })
    } catch (error) {
      console.error(error.message)
    }
  }

  const removeInterest = async () => {
    try {
      const response = await fetch(`/api/v1/events/${event.id}/interests`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify()
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setUserInterests({ isAttending: false, isInterested: false })
      setTotalInterests({ attending: body.totalAttending.value, interested: body.totalInterested.value })
    } catch (error) {
      console.error(error.message)
    }
  }

  const isAttendingClickHandler = (event) => {
    event.preventDefault()
    if (userInterests.isInterested && !userInterests.isAttending) {
      editInterest({ value: 'attending' })
    } else if (userInterests.isAttending) {
      removeInterest()
    } else {
      newInterest({ value: 'attending' })
    }
  }

  const isInterestedClickHandler = (event) => {
    event.preventDefault()
    if (!userInterests.isInterested && userInterests.isAttending) {
      editInterest({ value: 'interested' })
    } else if (userInterests.isInterested) {
      removeInterest()
    } else {
      newInterest({ value: 'interested' })
    }
  }

  const getThumbnail = (event) => {
    let thumbnail = 'https://image.freepik.com/free-vector/hand-with-pen-mark-calendar_1325-126.jpg'
    if (event.gameDetails) {
      thumbnail = `https://images.igdb.com/igdb/image/upload/t_cover_big/${event.gameDetails.coverArt}.jpg`
    } else if (event.studyTopic) {
      thumbnail = event.studyTopic.imageUrl
    }
    return thumbnail
  }

  const convertDate = (epochTime) => {
    const date = new Date(parseInt(epochTime))
    const dayOfWeek = date.toLocaleDateString('default', { weekday: 'short' })
    const month = date.toLocaleDateString('default', { month: 'short' })
    const day = date.getDate()
    const time = date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    return `${dayOfWeek} ${month} ${day} ${time}`
  }

  let attendingButton = ''
  let interestedButton = ''
  if (user !== null) {
    attendingButton =
      <ThemeProvider theme={theme}>
        <Button
          color={upVoteButtonClass}
          onClick={isAttendingClickHandler} 
          variant='contained'
          size='small'>
          Attending: {totalInterests.attending}
        </Button>
      </ThemeProvider>
    interestedButton =
      <ThemeProvider theme={theme}>
        <Button
          color={downVoteButtonClass}
          onClick={isInterestedClickHandler} 
          variant='contained'
          size='small'>
          Interested: {totalInterests.interested}
        </Button>
      </ThemeProvider>
  }

  return (
    <Tile
      event={event}
      user={user}
      attending={attendingButton}
      interested={interestedButton}
      getThumbnail={getThumbnail}
      convertDate={convertDate}
      isActiveEvent={isActiveEvent}
    />
  )
}

export default TileLogic