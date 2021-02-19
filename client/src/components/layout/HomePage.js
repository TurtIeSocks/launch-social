import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { AppBar, Grid, Tab, Tabs } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'

import TabPanel from './TabPanel.js'
import theme from '../mui/theme.js'
import useStyles from './styling.js'
import EventTile from '../eventTile/Logic.js'
import Stats from './Stats.js'

const HomePage = props => {
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
