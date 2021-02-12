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

  const newVote = async (interestPayload) => {
    try {
      const response = await fetch(`/api/v1/events/${event.id}/votes`, {
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

  const editVote = async (votePayload) => {
    try {
      const response = await fetch(`/api/v1/events/${event.id}/votes`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(votePayload)
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

  const removeVote = async () => {
    try {
      const response = await fetch(`/api/v1/events/${event.id}/votes`, {
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
      editVote({ value: 'attending' })
    } else if (userInterests.isAttending) {
      removeVote()
    } else {
      newVote({ value: 'attending' })
    }
  }

  const isInterestedClickHandler = (event) => {
    event.preventDefault()
    if (!userInterests.isInterested && userInterests.isAttending) {
      editVote({ value: 'interested' })
    } else if (userInterests.isInterested) {
      removeVote()
    } else {
      newVote({ value: 'interested' })
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