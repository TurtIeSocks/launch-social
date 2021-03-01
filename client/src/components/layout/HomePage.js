import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { ThemeProvider } from '@material-ui/styles'
import { AppBar, Grid, Tab, Tabs, Button, Paper, Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

import TabPanel from './TabPanel.js'
import theme from '../mui/theme.js'
import useStyles from './styling.js'
import EventTile from '../eventTile/Logic.js'
import Stats from './Stats.js'

import Carousel from 'react-material-ui-carousel'
import splashImage from '../../../public/splash.png'

const HomePage = ({
  events,
  user,
  handleChange,
  a11yProps,
  stats,
  value,
  page,
  handlePaginationChange,
  paginationPages
}) => {
  const classes = useStyles()
  const [carouselImages, setCarouselImages] = useState([])

  const allEvents = events.map(event => {
    return (
      <Grid item xs={12} key={event.id}>
        <EventTile
          event={event}
          user={user}
        />
      </Grid>
    )
  })

  const generateCarouselImages = () => {
    const currentDate = (new Date).getTime()
    const images = [
      <Grid container
        key={0}
        style={{ backgroundImage: `url(${splashImage})` }}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.carouselImage}>
        <Grid container item xs={11} sm={10}
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.carouselSplash}>
          <Grid item xs={12}>
            <Typography variant='h2' className={classes.splashTitle}>
              Welcome to Launch Social!
            </Typography>
          </Grid>
          <Grid item xs={6}
            className={classes.carouselTitle}>
            <Typography variant='h6' className={classes.splashTitle}>
              The place to coordinate social events and study sessions with your fellow launchers!
            </Typography>
          </Grid>
          <Grid item xs={6}
            className={classes.carouselTitle}>
            <Typography variant='h6' className={classes.splashTitle}>
              You'll be able to create events and indicate whether you're interested or plan to attend events once you sign in.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    ]
    if (allEvents) {
      events.forEach(event => {
        if ((event.startDate < currentDate && event.endDate > currentDate) || event.featured) {
          const image = event.coverArt
            ? `https://images.igdb.com/igdb/image/upload/t_original/${event.coverArt}.jpg`
            : event.studyTopic
          images.push(
            <Grid container
              key={image}
              style={{ backgroundImage: `url(${image})` }}
              direction="row"
              justify="center"
              alignItems="flex-end"
              className={classes.carouselImage}>
              <Grid container item xs={12}
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.carouselFeatured}>
                <Grid item xs={12} sm={9}>
                  <Typography variant='h4' className={classes.title}>
                    {event.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Link to={`/events/${event.id}`}>
                    <Button color='primary'>
                      <Typography variant='h6' className={classes.title}>
                        Event Details
                      </Typography>
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          )
        }
      })
      setCarouselImages(images)
    }
  }

  useEffect(() => {
    generateCarouselImages()
  }, [events])
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root} >
        <Grid container
          justify="center"
          spacing={2}>
          <Grid item xs={10}>
            <Carousel
              interval={10000}
              next={() => { }}
              prev={() => { }}>
              {carouselImages}
            </Carousel>
          </Grid>
          <Grid container item sm={12} md={8} lg={7}
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}>
            {allEvents}
            <Grid item xs={12} sm={9} md={8} lg={7} xl={5}>
              <div className={classes.pagination}>
                <Pagination
                  count={paginationPages}
                  color="secondary"
                  page={page}
                  onChange={handlePaginationChange}
                  size='large'
                  variant='outlined'
                />
              </div>
            </Grid>
          </Grid>
          <Grid container item md={4} lg={3}>
            <Grid item xs={12}>
              <div className={classes.tabs}>
                <AppBar position="static" color='primary'>
                  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab label="Game Stats" {...a11yProps(0)} />
                    <Tab label="Study Stats" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  {stats && <Stats
                    stats={stats.gameStats}
                    type={'gaming'}
                  />}
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {stats && <Stats
                    stats={stats.studyStats}
                    type={'study'}
                  />}
                </TabPanel>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default HomePage
