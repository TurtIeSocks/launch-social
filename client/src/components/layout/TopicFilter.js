import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom"
import HomePage from './HomePage.js'

const HomeLogic = ({ user, match }) => {
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState(undefined)
  const [value, setValue] = useState(1)
  const [page, setPage] = useState(1)
  const [paginationPages, setPaginationPages] = useState(10)

  const { id } = match.params

  const fetchAllEvents = async () => {
    try {
      const response = await fetch(`/api/v1/homepage/studyTopic/${id}/${page}`)
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