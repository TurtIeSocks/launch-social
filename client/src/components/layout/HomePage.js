import React, { useState, useEffect } from 'react';
import EventTileLogic from '../events/EventTileLogic.js'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const HomePage = props => {
  const classes = useStyles()
  const [value, setValue] = useState(null);
  const [events, setEvents] = useState([])
  const [games, setGames] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
        <EventTileLogic
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
