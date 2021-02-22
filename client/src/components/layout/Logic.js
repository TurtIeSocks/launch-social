import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom"
import HomePage from './HomePage.js'
import Fetch from '../../services/fetch/Fetch.js'

const HomeLogic = ({ user }) => {
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState(undefined)
  const [value, setValue] = useState(0)
  const [page, setPage] = useState(1)
  const [paginationPages, setPaginationPages] = useState(10)

  const fetchAllEvents = async () => {
    const body = await Fetch.fetchAllEvents(page)
    setEvents(body.events)
    setStats(body.stats)
    setPaginationPages(Math.ceil(body.total / 10))
  }

  useEffect(() => {
    fetchAllEvents()
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