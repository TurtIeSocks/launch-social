import React from 'react';

import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';
import { useLabelIconStyles } from '@mui-treasury/styles/icon/label';
import { useRowFlexStyles } from '@mui-treasury/styles/flex/row';
import { Grid, Avatar, Card, CardContent, CardMedia, Divider } from '@material-ui/core';

const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    display: 'flex',
    padding: spacing(2),
    borderRadius: 16,
  },
  media: {
    minWidth: '25%',
    maxWidth: '25%',
    flexShrink: 0,
    backgroundColor: palette.grey[200],
    borderRadius: 12,
    boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
  },
  rating: {
    verticalAlign: 'text-top',
  },
  content: {
    padding: spacing(0, 2, 0, 2),
  },
  heading: {
    fontSize: '2.5vw',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    color: 'rgb(235,35,122)',
    marginBottom: 0,
    marginRight: spacing(1.5),
    display: 'inline-block',
  },
  date: {
    fontSize: 15,
    fontWeight: 'light',
    letterSpacing: '0.5px',
    color: 'rgb(51,72,94)',
    marginBottom: 0,
    marginRight: spacing(1.5),
    display: 'inline-block',
  },
  body: {
    fontSize: 14,
    color: palette.grey[500],
  },
  divider: {
    margin: spacing(1, 0),
  },
  textFooter: {
    fontSize: 14,
  },
  icon: {
    fontSize: '1.2rem',
    verticalAlign: 'bottom',
  },
  avatar: {
    maxWidth: 30,
    maxHeight: 30
  }
}));

const EventTileStyle = ({ event, user, interested, attending }) => {
  console.log(user)
  const styles = useStyles();
  const gutterStyles = usePushingGutterStyles({ space: 1.5 });
  const labelStyles = useLabelIconStyles({ linked: true });
  const flexStyles = useRowFlexStyles();

  let coverArt = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1920px-Unofficial_JavaScript_logo_2.svg.png'
  if (event.gameDetails) {
    coverArt = `https://images.igdb.com/igdb/image/upload/t_cover_big/${event.gameDetails.coverArt}.jpg`
  }
  const titleText = `${event.month.name} ${event.day}, ${event.year.year}`

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

export default EventTileStyle
