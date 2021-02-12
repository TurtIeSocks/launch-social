import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

const EventTile = ({ event, user }) => {
  const [userInterests, setUserInterests] = useState({
    isAttending: false,
    isInterested: false
  })
  const [totalInterests, setTotalInterests] = useState({
    attending: event.totalAttending.value,
    interested: event.totalInterests.value
  })

  let upVoteButtonClass = 'button'

  if (userInterests.isAttending) {
    upVoteButtonClass = 'success button'
  }

  let downVoteButtonClass = 'button'

  if (userInterests.isInterested) {
    downVoteButtonClass = 'alert button'
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
      console.log(body)
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

  let voteButtons = ''
  if (user !== null) {
    voteButtons =
      <div>
        <button className={upVoteButtonClass} onClick={isAttendingClickHandler}>
          Attending ( {totalInterests.attending} )
        </button>
        <button className={downVoteButtonClass} onClick={isInterestedClickHandler}>
          Interested ( {totalInterests.interested} )
        </button>
      </div>
  }

  return (
    <div className='callout'>
      <Link to={`/events/${event.id}`}>{event.name}</Link>
      {voteButtons}
    </div>
  )
}

export default EventTile