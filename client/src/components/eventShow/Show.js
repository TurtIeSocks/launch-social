import React from "react"
import { ThemeProvider } from '@material-ui/core/styles'
import { Grid, Divider, Typography } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import theme from '../mui/theme.js'
import useStyles from './styling.js'
import CommentLogic from "../comments/Logic.js"

const Show = ({
  thisEvent,
  setThisEvent,
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
  getGenres,
  commentState,
  setCommentState,
  user
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
                <Typography variant='h2' className={classes.title}>{thisEvent.name}</Typography>
              </Grid>
              <Grid item xs={4} sm={3}>
                {thisEvent.startDate && getDate(thisEvent.startDate, thisEvent.endDate)}
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} light />
              </Grid>
            </Grid>
            <Grid container item xs={12} sm={5}
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.coverArt}
            >
              <Grid item xs={12} >
                {editButton}
                {deleteButton}
              </Grid>
              <Grid item xs={12}>
                <a href={`${getUrl(thisEvent.eventTypeId)}`} target="_blank">
                  <img src={getCoverArt(thisEvent.eventTypeId)} className={classes.coverArt} />
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
                  {thisEvent.description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} light />
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6' className={classes.headers}>
                  Host:
                </Typography>
                {thisEvent.user && getEventCreator(thisEvent)}
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6' className={classes.headers}>
                  Location:
                  </Typography>
                <Typography variant='subtitle1' display='inline'>
                  {thisEvent.location && thisEvent.location}
                </Typography>
                <Typography variant='subtitle1' display='inline'>
                  {thisEvent.meetUrl && ' / '}
                  {thisEvent.meetUrl && getMeetUrl(thisEvent.meetUrl)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} light />
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6' className={classes.headers}>Attending:</Typography>
                {thisEvent.userInterests && getInterestedUsers(thisEvent, 'attending')}
              </Grid>
              <Grid item x={6}>
                <Typography variant='h6' className={classes.headers}>Interested:</Typography>
                {thisEvent.userInterests && getInterestedUsers(thisEvent, 'interested')}
              </Grid>
            </Grid>
            {thisEvent.gameDetails && <>
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
                  <Typography variant='body2' className={classes.gameSummary}>{getGameSummary(thisEvent)}</Typography>
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
                  {getGenres(thisEvent.gameDetails.genres)}
                  <Grid item xs={12}>
                    <Divider className={classes.divider} light />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='h6' className={classes.headers}>
                      Platforms:
                  </Typography>
                  </Grid>
                  {getPlatforms(thisEvent.gameDetails.platforms)}
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
                  <Carousel>
                    {carouselImages}
                  </Carousel>
                </Grid>
                <Grid item xs={12} md={5} className={classes.media}>
                  <Carousel
                    autoPlay={false}
                  >
                    {carouselVideos}
                  </Carousel>
                </Grid>
              </Grid>
            </>}
            <Grid item xs={12}>
              <Divider className={classes.divider} light />
            </Grid>
            <Grid item xs={12} sm={10}
            >
              <CommentLogic
                thisEvent={thisEvent}
                setThisEvent={setThisEvent}
                commentState={commentState}
                setCommentState={setCommentState}
                user={user}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default Show
