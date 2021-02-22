import React, { useState } from 'react'
import { Redirect } from "react-router-dom"
import { ThemeProvider } from '@material-ui/core/styles'
import { Grid, Typography, Button } from '@material-ui/core'
import theme from '../mui/theme.js'
import useStyles from './styling.js' 
import Fetch from '../../services/fetch/Fetch.js'

const DeleteEvent = props => {
  const classes = useStyles()
  const [shouldRedirect, setShouldRedirect] = useState({
    enable: false,
    where: '/'
  })

  const { id: eventId } = props.match.params

  const deleteEvent = async () => {
    await Fetch.deleteEvent(eventId)
    setShouldRedirect({ enable: true, where: '/' })
  }

  const goBack = () => {
    setShouldRedirect({ enable: true, where: `/events/${eventId}` })
  }

  if (shouldRedirect.enable) {
    return <Redirect to={shouldRedirect.where} />
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container
        alignItems="center"
        justify="center"
      >
        <Grid container item xs={6}
          className={classes.root}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={5} >
            <Button variant="contained" color="primary" onClick={deleteEvent}>
              <Typography className={classes.button}>Delete</Typography></Button>
          </Grid>
          <Grid item xs={5}>
            <Button variant="contained" color="secondary" onClick={goBack}>
              <Typography className={classes.button}>Go Back</Typography></Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default DeleteEvent
