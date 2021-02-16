import React from 'react';

import cx from 'clsx';
import { Link } from "react-router-dom";
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';
import { useLabelIconStyles } from '@mui-treasury/styles/icon/label';
import { useRowFlexStyles } from '@mui-treasury/styles/flex/row';
import { Grid, Avatar, Card, CardContent, CardMedia, Divider } from '@material-ui/core';
import useStyles from './styling.js'

const Tile = ({ event, interested, attending }) => {
  const styles = useStyles();
  const gutterStyles = usePushingGutterStyles({ space: 1.5 });
  const labelStyles = useLabelIconStyles({ linked: true });
  const flexStyles = useRowFlexStyles();

  const convertDate = (epochTime) => {
    const date = new Date(parseInt(epochTime))
    const dayOfWeek = date.toLocaleDateString('default', { weekday: 'short' })
    const month = date.toLocaleDateString('default', { month: 'short' })
    const day = date.getDate()
    const time = date.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")
    return `${dayOfWeek} ${month} ${day} ${time}`
  }

  let coverArt = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1920px-Unofficial_JavaScript_logo_2.svg.png'
  if (event.gameDetails) {
    coverArt = `https://images.igdb.com/igdb/image/upload/t_cover_big/${event.gameDetails.coverArt}.jpg`
  }
  
  const titleText = `${convertDate(event.startDate)}`

  return (
    <Card className={styles.card} elevation={3}>
      <CardMedia
        className={styles.media}
        image={coverArt}
      />
      <CardContent className={styles.content}>
        <Grid container
          alignItems="center"
          justify="space-between"
        >
          <Grid item xs={8}>
            <h3 className={styles.heading}>{event.name}</h3>
          </Grid>
          <Grid item xs={4}>
            <h2 className={styles.date}>{titleText}</h2>
          </Grid>
          <Grid item xs={8}>
            <p className={styles.body}>{event.description}</p>
          </Grid>
          <Grid item xs={1}>
            <Avatar className={styles.avatar}><img src={`${event.user.avatarUrl}`} /></Avatar>
          </Grid>
          <Grid item xs={3}>
            <h2 className={styles.body}> {event.user.username}</h2>
          </Grid>
          <Grid item xs={12}>
            <Divider className={styles.divider} light />
            <div className={flexStyles.parent}>
              <Link to={`/events/${event.id}`}>
                Event Details <ArrowForwardIos className={labelStyles.icon} />
              </Link>
              <div
                className={cx(
                  flexStyles.rightChild,
                  flexStyles.parent,
                  gutterStyles.parent
                )}
              >
                {attending}
                {interested}
              </div>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Tile
