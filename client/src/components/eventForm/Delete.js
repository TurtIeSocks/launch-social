import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { Redirect } from "react-router-dom"
import { ThemeProvider } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import theme from '../mui/theme.js'
import useStyles from './styling.js' 

const Delete = props => {
  const classes = useStyles();
  const [shouldRedirect, setShouldRedirect] = useState({
    enable: false,
    where: '/'
  })

  const { id: eventId } = props.match.params

  const deleteEvent = async () => {
    try {
      const response = await fetch(`/api/v1/events/${eventId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        })
      })
      setShouldRedirect({ enable: true, where: '/' })
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
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

export default Delete
