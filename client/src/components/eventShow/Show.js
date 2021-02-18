import React from "react"
import { ThemeProvider } from '@material-ui/core/styles'
import { Grid, Divider, Typography } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import theme from '../mui/theme.js'
import useStyles from './styling.js'

const Show = ({
  event,
  game,
  carouselImages,
  carouselVideos,
  getDate,
  getUrl,
  getCoverArt,
  getEventCreator,
  getInterestedUsers,
  getPlatforms,
  getMeetUrl,
  editButton,
  deleteButton
}) => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <Grid container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        className={classes.root}>
        <Grid item xs={12} sm={1}>
          <div className={classes.buttons}>{editButton}</div>
          <div className={classes.buttons}>{deleteButton}</div>
        </Grid>
        <Grid item xs={8} sm={8} >
          <Typography variant='h2' className={classes.title}>{event.name}</Typography>
        </Grid>
        <Grid item xs={4} sm={3}>
          {event.startDate && getDate(event.startDate, event.endDate)}
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} light />
        </Grid>
        <Grid item xs={12} sm={3}>
          <a href={`${getUrl(event.eventTypeId)}`} target="_blank">
            <img src={getCoverArt(event.eventTypeId)} className={classes.coverArt} />
          </a>
        </Grid>
        <Grid item xs={9} sm={7}>
          <Typography variant='body1' className={classes.eventDescription}>{event.description}</Typography>
          <Typography variant='body2' className={classes.gameSummary}>{game && game.summary}</Typography>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
            className={classes.platforms}>
            {game && game.platforms && getPlatforms(game.platforms)}
          </Grid>
        </Grid>
        <Grid item xs={3} sm={2}>
          <Typography variant='h6' className={classes.headers}>Host:</Typography>
          {event.user && getEventCreator(event)}
          <Divider className={classes.divider} light />
          <Typography variant='h6' className={classes.headers}>Location:</Typography>
          <div><Typography variant='caption'>{event.location && event.location}</Typography></div>
          <div><Typography variant='caption'> {event.meetUrl && getMeetUrl(event.meetUrl)}</Typography></div>
          <Divider className={classes.divider} light />
          <Typography variant='h6' className={classes.headers}>Attending:</Typography>
          {event.userInterests && getInterestedUsers(event, 'attending')}
          <Divider className={classes.divider} light />
          <Typography variant='h6' className={classes.headers}>Interested:</Typography>
          {event.userInterests && getInterestedUsers(event, 'interested')}
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} light />
        </Grid>
        <Grid item xs={12} md={5} className={classes.media}>
          <Carousel
            swipe
            next={() => { }}
            prev={() => { }}>
            {carouselImages}
          </Carousel>
        </Grid>
        <Grid item xs={12} md={5} className={classes.media}>
          <Carousel
            autoPlay={false}
            swipe
            next={() => { }}
            prev={() => { }}>
            {carouselVideos}
          </Carousel>
        </Grid>
      </Grid>
    </ThemeProvider >
  )
}

export default Show
