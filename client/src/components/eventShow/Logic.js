import React, { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import { Grid, Divider, Typography } from '@material-ui/core'
import ReactPlayer from 'react-player'
import { Delete, Edit } from '@material-ui/icons/'
import Show from './Show.js'
import useStyles from './styling.js'

const EventShow = props => {
  const classes = useStyles()
  const [event, setEvent] = useState({})
  const [game, setGame] = useState({})
  const [carouselImages, setCarouselImages] = useState([])
  const [carouselVideos, setCarouselVideos] = useState([])

  const { id: eventId } = props.match.params

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/v1/events/${eventId}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setEvent(body.event)
      setGame(body.event.gameDetails)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchEvent()
  }, [])

  const getDate = (startDate, endDate) => {
    const startDateRaw = new Date(parseInt(startDate))
    const endDateRaw = new Date(parseInt(endDate))

    const start = {
      month: startDateRaw.toLocaleDateString('default', { month: 'short' }),
      day: startDateRaw.getDate(),
      week: startDateRaw.toLocaleDateString('default', { weekday: 'short' }),
      time: startDateRaw.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    }
    const end = {
      month: endDateRaw.toLocaleDateString('default', { month: 'short' }),
      day: endDateRaw.getDate(),
      week: endDateRaw.toLocaleDateString('default', { weekday: 'short' }),
      time: endDateRaw.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    }

    const firstRow = <Typography variant='h4' className={classes.date}>{start.week} {start.month} {start.day}</Typography>
    let secondRow = ''
    let thirdRow = ''
    let fourthRow = ''
    if (start.day === end.day) {
      secondRow = <Typography variant='h6' className={classes.time}>{start.time} - {end.time}</Typography>
    } else {
      secondRow = (
        <Typography variant='h6' className={classes.time}>
          Starts: {start.time}
        </Typography>
      )
      thirdRow = (
        <>
          <Divider className={classes.divider} light />
          <Typography variant='h4' className={classes.date}>
            {end.week} {end.month} {end.day}
          </Typography>
        </>
      )
      fourthRow = (
        <Typography variant='h6' className={classes.time}>
          Ends: {end.time}
        </Typography>
      )
    }
    const content = (
      <>
        {firstRow}
        {secondRow}
        {thirdRow}
        {fourthRow}
      </>
    )
    return content
  }

  const getEventCreator = event => {
    const { id, username, profileUrl, avatarUrl } = event.user
    return (
      <div key={id} className={classes.username}>
        <Link to={profileUrl}>
          <img src={avatarUrl} className={classes.avatar} /><Typography variant='caption'>{username}</Typography>
        </Link>
      </div>
    )
  }

  const getInterestedUsers = (event, type) => {
    return event.userInterests.map(interest => {
      const { id, username, profileUrl, avatarUrl } = interest.userInfo
      if (interest.value === type) {
        return (
          <div key={id} className={classes.username}>
            <Link to={profileUrl}>
              <img src={avatarUrl} className={classes.avatar} /><Typography variant='caption'>{username}</Typography>
            </Link>
          </div>
        )
      }
    })
  }

  const getPlatforms = (gamePlatforms) => {
    let gridLogic = 2
    if (gamePlatforms.length < 5) {
      gridLogic = 3
    } else if (gamePlatforms.length < 4) {
      gridLogic = 4
    }
    return gamePlatforms.map(platform => {
      return (
        <Grid item xs={gridLogic} key={platform.imageId} className={classes.platforms}>
          {platform.name}
        </Grid>
      )
    })
  }

  const getCoverArt = () => {
    if (event.gameDetails) {
      return `https://images.igdb.com/igdb/image/upload/t_cover_big/${event.gameDetails.coverArt}.jpg`
    } else if (event.studyTopic) {
      return event.studyTopic.imageUrl
    }
  }

  const getUrl = () => {
    if (event.gameDetails) {
      return event.gameDetails.url
    } else if (event.studyTopic) {
      return `https://en.wikipedia.org/wiki/${event.studyTopic.name}`
    }
  }

  const generateCarouselImages = images => {
    if (images)
      return images.map(image => {
        const imageUrl = `https://images.igdb.com/igdb/image/upload/t_original/${image.imageId}.jpg`
        return (
          <div
            key={image.imageId}
            style={{ backgroundImage: `url(${imageUrl})` }}
            className={classes.carouselImage}>
          </div>
        )
      })
  }

  const generateCarouselVideos = videos => {
    if (videos)
      return videos.map(video => {
        return (
          <div
            key={video.videoId}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video.videoId}`}
              width={400}
              height={225}
              playsinline
              className={classes.carouselVideo} />
          </div>
        )
      })
  }

  const getMeetUrl = url => {
    if (url) {
      if (url.includes('zoom')) {
        return <a href={url}>Zoom Link</a>
      } else if (url.includes('google')) {
        return <a href={url}>Hangouts Link</a>
      } else {
        return <a href={url}>Virtual Meeting</a>
      }
    } else {
      return ''
    }
  }

  let editButton, deleteButton = ''
  if (props.user && props.user.id === event.userId) {
    editButton =
      <Link to={`/events/${event.id}/edit`} >
        <Edit fontSize='large' color='secondary' />
      </Link>
    deleteButton =
      <Link to={`/events/${event.id}/delete`}>
        <Delete fontSize='large' color='primary' />
      </Link>
  }

  useEffect(() => {
    if (game) {
      setCarouselImages(generateCarouselImages(game.images))
      setCarouselVideos(generateCarouselVideos(game.videos))
    }
  }, [game])

  return (
    <Show
      event={event}
      game={game}
      getCoverArt={getCoverArt}
      getUrl={getUrl}
      carouselImages={carouselImages}
      carouselVideos={carouselVideos}
      getDate={getDate}
      getEventCreator={getEventCreator}
      getInterestedUsers={getInterestedUsers}
      getPlatforms={getPlatforms}
      getMeetUrl={getMeetUrl}
      editButton={editButton}
      deleteButton={deleteButton}
    />
  )
}

export default withRouter(EventShow)
