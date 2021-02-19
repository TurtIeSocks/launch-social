import React from 'react'

import cx from 'clsx'
import { Link } from "react-router-dom"
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing'
import { useLabelIconStyles } from '@mui-treasury/styles/icon/label'
import { useRowFlexStyles } from '@mui-treasury/styles/flex/row'
import { Grid, Avatar, Card, CardContent, CardMedia, Divider, Typography } from '@material-ui/core'
import useStyles from './styling.js'

const Tile = ({ event, interested, attending, getThumbnail, convertDate, isActiveEvent }) => {
  const classes = useStyles()
  const gutterStyles = usePushingGutterStyles({ space: 1.5 })
  const labelStyles = useLabelIconStyles({ linked: true })
  const flexStyles = useRowFlexStyles()

  return (
    <Card className={eval(`classes.${isActiveEvent(event)}`)} elevation={3}>
      <CardMedia
        className={classes.media}
        image={getThumbnail(event)}
      />
      <CardContent className={classes.content}>
        <Grid container
          spacing={1}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} sm={8}>
            <Typography variant='h3' className={classes.heading}>{event.name}</Typography>
          </Grid>
          <Grid item xs={8} sm={4}>
            <Typography variant='h2' className={classes.date}>{convertDate(event.startDate)}</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant='body1' className={classes.body}>{event.description}</Typography>
          </Grid>
          <Grid item xs={3} sm={3}>
            <Typography variant='h2' className={classes.username} display='inline'><img src={`${event.user.avatarUrl}`} className={classes.avatar}/>{event.user.username}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider className={classes.divider} light />
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className={flexStyles.parent}>
              <Link to={`/events/${event.id}`}>
                <Typography variant='body1' className={classes.eventDetails}>
                  Event Details <ArrowForwardIos className={labelStyles.icon} />
                </Typography>
              </Link>
              <div
                className={cx(
                  flexStyles.rightChild,
                  flexStyles.parent,
                  gutterStyles.parent
                )}
              >
              </div>
            </div>
          </Grid>
          <Grid item xs={6} sm={4} className={classes.buttons}>
            {attending}
          </Grid>
          <Grid item xs={6} sm={4} className={classes.buttons}>
            {interested}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Tile
