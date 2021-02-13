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
      <Grid item xs={12} key={event.id}>
        <EventTileLogic
          event={event}
          user={props.user}
        />
      </Grid>
    )
  })

  return (
    <div className={classes.root} >
      <Grid container spacing={2}>
        <Grid container item xs={12} sm={9} spacing={2}>
          {allEvents}
        </Grid>
        <Grid item xs={12} sm={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </div>
  )
}

export default HomePage
