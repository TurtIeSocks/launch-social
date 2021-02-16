import React, { useState, useEffect } from 'react'
import EventTile from '../eventTile/Logic.js'
import Grid from '@material-ui/core/Grid'
import useStyles from './styling.js'

const HomePage = props => {
  const classes = useStyles()
  const [events, setEvents] = useState([])

  const fetchEvents = async () => {
    try {
      const response = await fetch(`/api/v1/events`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setEvents(body.events)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const allEvents = events.map(event => {
    return (
      <Grid item xs={12} sm={11} md={9} lg={7} key={event.id}>
        <EventTile
          event={event}
          user={props.user}
        />
      </Grid>
    )
  })

  return (
    <div className={classes.root} >
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}>
        {allEvents}
      </Grid>
    </div>
  )
}

export default HomePage
