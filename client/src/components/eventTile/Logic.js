import { Button, ThemeProvider, Tooltip } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import Tile from './Tile'
import theme from '../mui/theme.js'
import Fetch from '../../services/fetch/Fetch.js'

const TileLogic = ({ event: eventDetails, user }) => {
  const [userInterests, setUserInterests] = useState({
    isAttending: false,
    isInterested: false
  })
  const [totalInterests, setTotalInterests] = useState({
    attending: eventDetails.totalAttending.value,
    interested: eventDetails.totalInterests.value
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
    if (user && eventDetails.userInterests) {
      getUserInterestState(eventDetails.userInterests.value)
    }
  }, [])

  const getUserInterestState = value => {
    let state = { isAttending: false, isInterested: true }
    if (value && value === 'attending') {
      state = { isAttending: true, isInterested: false }
    }
    return setUserInterests(state)
  }

  const newInterest = async (interestPayload) => {
    const body = await Fetch.newInterest(eventDetails.id, interestPayload)
    getUserInterestState(body.interest.value)
    setTotalInterests({ attending: body.totalAttending.value, interested: body.totalInterested.value })
  }

  const editInterest = async (interestPayload) => {
    const body = await Fetch.editInterest(eventDetails.id, interestPayload)
    getUserInterestState(body.interest.value)
    setTotalInterests({ attending: body.totalAttending.value, interested: body.totalInterested.value })
  }

  const removeInterest = async () => {
    const body = await Fetch.removeInterest(eventDetails.id)
    setUserInterests({ isAttending: false, isInterested: false })
    setTotalInterests({ attending: body.totalAttending.value, interested: body.totalInterested.value })
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
    if (event.coverArt) {
      thumbnail = `https://images.igdb.com/igdb/image/upload/t_cover_big/${event.coverArt}.jpg`
    } else if (event.studyTopic) {
      thumbnail = event.studyTopic
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

  const disableButtons = !user ? true : false
  const attendingToolTip = user ? 'Planning to Attend?' : 'Sign in to Use'
  const interestedToolTip = user ? 'Interested?' : 'Sign in to Use'

  const attendingButton = (
    <ThemeProvider theme={theme}>
      <Tooltip title={attendingToolTip}>
        <span>
          <Button
            color={upVoteButtonClass}
            onClick={isAttendingClickHandler}
            variant='contained'
            size='small'
            disabled={disableButtons}
          >
            Attending: {totalInterests.attending}
          </Button>
        </span>
      </Tooltip>
    </ThemeProvider>
  )
  const interestedButton = (
    <ThemeProvider theme={theme}>
      <Tooltip title={interestedToolTip}>
        <span>
          <Button
            color={downVoteButtonClass}
            onClick={isInterestedClickHandler}
            variant='contained'
            size='small'
            disabled={disableButtons}
          >
            Interested: {totalInterests.interested}
          </Button>
        </span>
      </Tooltip>
    </ThemeProvider>
  )

  return (
    <Tile
      event={eventDetails}
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