import React, { useState, useEffect } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { AppBar, Grid, Tab, Tabs } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

import TabPanel from './TabPanel.js'
import theme from '../mui/theme.js'
import useStyles from './styling.js'
import EventTile from '../eventTile/Logic.js'
import Stats from './Stats.js'

const HomePage = props => {
  const classes = useStyles()
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState(undefined)
  const [value, setValue] = useState(0)
  const [page, setPage] = useState(1)
  const [paginationPages, setPaginationPages] = useState(10)

  const fetchEvents = async () => {
    try {
      const response = await fetch(`/api/v1/homepage/${page}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setEvents(body.events)
      setStats(body.stats)
      setPaginationPages(Math.ceil(body.total / 10))
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [page])

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handlePaginationChange = (event, value) => {
    setPage(value)
  }


  const allEvents = events.map(event => {
    return (
      <Grid item xs={12} key={event.id}>
        <EventTile
          event={event}
          user={props.user}
        />
      </Grid>
    )
  })

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root} >
        <Grid container
          justify="center"
          spacing={2}>
          <Grid container item sm={12} md={8} lg={7}
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}>
            {allEvents}
            <Grid item xs={12} sm={7} >
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
