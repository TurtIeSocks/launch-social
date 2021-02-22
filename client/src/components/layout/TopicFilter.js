import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom"
import HomePage from './HomePage.js'
import Fetch from '../../services/fetch/Fetch.js'

const HomeLogic = ({ user, match }) => {
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState(undefined)
  const [value, setValue] = useState(1)
  const [page, setPage] = useState(1)
  const [paginationPages, setPaginationPages] = useState(10)

  const { id } = match.params

  const fetchAllEvents = async () => {
    const body = await Fetch.fetchRelated(id, page, 'studyTopic')
    setEvents(body.events)
    setStats(body.stats)
    setPaginationPages(Math.ceil(body.total / 10))
  }

  useEffect(() => {
    fetchAllEvents()
  }, [id, page])

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

  return (
    <>
      {events && <HomePage
        events={events}
        user={user}
        handleChange={handleChange}
        a11yProps={a11yProps}
        stats={stats}
        value={value}
        page={page}
        handlePaginationChange={handlePaginationChange}
        paginationPages={paginationPages}
      />}
    </>
  )
}

export default withRouter(HomeLogic)