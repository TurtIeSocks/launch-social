import React, { useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import { makeStyles, createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles'
import { Grid, Divider, Typography, Button } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import ReactPlayer from 'react-player'

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ED1A7A',
      main: '#ED1A7A',
      dark: '#ED1A7A',
      contrastText: '#000',
    },
    secondary: {
      light: '#49AEB9',
      main: '#49AEB9',
      dark: '#49AEB9',
      contrastText: '#fff',
    }
  }
});
theme = responsiveFontSizes(theme)

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(5),
    backgroundColor: '#EEEEEE',
    border: 'solid 5px #ED1A7A',
    borderRadius: theme.spacing(4),
    padding: theme.spacing(1),
    color: '#33485E',
    width: '90%',
    display: 'flex',
    textAlign: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#EEEEEE',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  title: {
    color: '#ED1A7A',
    fontWeight: 'bold',
  },
  date: {
    color: '#ED1A7A',
    fontWeight: 'bold',
  },
  time: {
    color: '#49AEB9',
  },
  avatar: {
    maxWidth: 15,
    maxHeight: 15,
    borderRadius: 10,
  },
  username: {
  },
  headers: {
    color: '#33485E',
    fontWeight: 'bold',
  },
  eventDescription: {
    color: '#33485E',
    textAlign: 'left',
    margin: '1vw 1vw 0 1vw'
  },
  gameSummary: {
    color: '#49AEB9',
    textAlign: 'left',
    margin: '1vw 1vw 0 1vw'
  },
  platformImage: {
    maxHeight: 50,
    maxWidth: 50
  },
  platforms: {
    paddingTop: theme.spacing(2),
    color: '#969696',
  },
  carouselImage: {
    height: 250,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    border: 'solid 5px #33485E',
    borderRadius: theme.spacing(3)
  },
  carouselVideo: {
    padding: theme.spacing(1),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  coverArt: {
    padding: theme.spacing(2)
  },
  buttons: {
    margin: theme.spacing(1)
  }
}));

const EventShow = props => {
  const classes = useStyles();
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

  let coverArt = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1920px-Unofficial_JavaScript_logo_2.svg.png'
  if (event.gameDetails) {
    coverArt = `https://images.igdb.com/igdb/image/upload/t_cover_big/${event.gameDetails.coverArt}.jpg`
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
        <Button size='small' variant="contained" color="secondary">
          Edit</Button>
      </Link>
    deleteButton =
      <Link to={`/events/${event.id}/delete`}>
        <Button size='small' variant="contained" color="primary">
          Delete</Button>
      </Link>
  }

  useEffect(() => {
    if (game) {
      setCarouselImages(generateCarouselImages(game.images))
      setCarouselVideos(generateCarouselVideos(game.videos))
    }
  }, [game])

  return (
    <ThemeProvider theme={theme}>
      <Grid container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        className={classes.root}>
        <Grid item xs={12} sm={2}>
          <div className={classes.buttons}>{editButton}</div>
          <div className={classes.buttons}>{deleteButton}</div>
        </Grid>
        <Grid item xs={8} sm={7} >
          <Typography variant='h2' className={classes.title}>{event.name}</Typography>
        </Grid>
        <Grid item xs={4} sm={3}>
          {event.startDate && getDate(event.startDate, event.endDate)}
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} light />
        </Grid>
        <Grid item xs={12} sm={3}>
          <a href={`${game.url}`} target="_blank">
            <img src={coverArt} className={classes.coverArt} />
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

export default withRouter(EventShow)
