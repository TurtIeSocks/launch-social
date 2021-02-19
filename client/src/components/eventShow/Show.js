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
  deleteButton,
  getGameSummary,
  getGenres
}) => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid container item xs={12} sm={12} md={10}
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.root}
            spacing={2}
          >
            <Grid container item xs={12}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={8} sm={9}>
                <Typography variant='h2' className={classes.title}>{event.name}</Typography>
              </Grid>
              <Grid item xs={4} sm={3}>
                {event.startDate && getDate(event.startDate, event.endDate)}
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} light />
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={5}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                {editButton}
                {deleteButton}
              </Grid>
              <Grid item xs={12}>
                <a href={`${getUrl(event.eventTypeId)}`} target="_blank">
                  <img src={getCoverArt(event.eventTypeId)} className={classes.coverArt} />
                </a>
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={7}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item xs={12}>
                <Typography variant='body1' className={classes.eventDescription}>
                  {event.description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} light />
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6' className={classes.headers}>
                  Host:
                </Typography>
                {event.user && getEventCreator(event)}
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6' className={classes.headers}>
                  Location:
                  </Typography>
                <Typography variant='subtitle1' display='inline'>
                  {event.location && event.location}
                </Typography>
                <Typography variant='subtitle1' display='inline'>
                  {event.meetUrl && ' / '}
                  {event.meetUrl && getMeetUrl(event.meetUrl)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} light />
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6' className={classes.headers}>Attending:</Typography>
                {event.userInterests && getInterestedUsers(event, 'attending')}
              </Grid>
              <Grid item x={6}>
                <Typography variant='h6' className={classes.headers}>Interested:</Typography>
                {event.userInterests && getInterestedUsers(event, 'interested')}
              </Grid>
            </Grid>
            {game && <>
              <Grid container item xs={12}
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12}>
                  <Divider className={classes.divider} light />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant='h6' className={classes.headers}>
                    Game Summary:
                  </Typography>
                  <Typography variant='body2' className={classes.gameSummary}>{getGameSummary(event)}</Typography>
                </Grid>
                <Grid container item xs={12} sm={6}
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={1}
                  className={classes.platforms}>
                  <Grid item xs={12}>
                    <Typography variant='h6' className={classes.headers}>
                      Genres:
                  </Typography>
                  </Grid>
                  {game && game.genres && getGenres(event)}
                  <Grid item xs={12}>
                    <Divider className={classes.divider} light />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h6' className={classes.headers}>
                      Platforms:
                  </Typography>
                  </Grid>
                  {game && game.platforms && getPlatforms(game.platforms)}
                </Grid>
                <Grid item xs={12}>
                  <Divider className={classes.divider} light />
                </Grid>
              </Grid>
              <Grid container item xs={12}
                direction="row"
                justify="space-around"
                alignItems="center"
              >
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
            </>}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default Show
