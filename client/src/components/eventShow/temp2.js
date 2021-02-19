<ThemeProvider theme={theme}>
  <div>
    <Grid container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid container item xs={12} sm={12} md={10}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={12} sm={1}>
          <div className={classes.buttons}>{editButton}</div>
          <div className={classes.buttons}>{deleteButton}</div>
        </Grid>

        <Grid item xs={8} sm={8}>
          <Typography variant='h2' className={classes.title}>{event.name}</Typography>
        </Grid>

        <Grid item xs={4} sm={3}>
          {event.startDate && getDate(event.startDate, event.endDate)}
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} light />
        </Grid>
      </Grid>

      <Grid container item xs={12} sm={3}
        direction="row"
        justify="center"
        alignItems="center"
      >

        <Grid item xs={12}>
          <a href={`${getUrl(event.eventTypeId)}`} target="_blank">
            <img src={getCoverArt(event.eventTypeId)} className={classes.coverArt} />
          </a>
        </Grid>

        <Grid item xs={12}>
          <a href={`${getUrl(event.eventTypeId)}`} target="_blank">
            <img src={getCoverArt(event.eventTypeId)} className={classes.coverArt} />
          </a>
        </Grid>

        <Grid item xs={12}>
          <a href={`${getUrl(event.eventTypeId)}`} target="_blank">
            <img src={getCoverArt(event.eventTypeId)} className={classes.coverArt} />
          </a>
        </Grid>

      </Grid>

      <Grid container item xs={12} sm
        direction="column"
        justify="center"
        alignItems="center"
      >

        <Grid item xs={12}>
          <Grid item>

            <Typography variant='body1' className={classes.eventDescription}>{event.description}</Typography>

          </Grid>

          <Grid item>

            <Typography variant='body2' className={classes.gameSummary}>{getGameSummary(event)}</Typography>

          </Grid>

          <Grid container item
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
            className={classes.platforms}>

            {game && game.platforms && getPlatforms(game.platforms)}

          </Grid>
        </Grid>

      </Grid>

      <Grid container item xs={12} sm={3}
        direction="column"
        justify="center"
        alignItems="center"
      >

        <Grid item xs>
          <Typography variant='h6' className={classes.headers}>Host:</Typography>
          {event.user && getEventCreator(event)}
          <Divider className={classes.divider} light />
        </Grid>

        <Grid item xs>
          <Typography variant='h6' className={classes.headers}>Location:</Typography>
          <div><Typography variant='caption'>{event.location && event.location}</Typography></div>
          <div><Typography variant='caption'> {event.meetUrl && getMeetUrl(event.meetUrl)}</Typography></div>
          <Divider className={classes.divider} light />
        </Grid>

        <Grid item xs>
          <Typography variant='h6' className={classes.headers}>Attending:</Typography>
          {event.userInterests && getInterestedUsers(event, 'attending')}
          <Divider className={classes.divider} light />
        </Grid>

        <Grid item xs>
          <Typography variant='h6' className={classes.headers}>Interested:</Typography>
          {event.userInterests && getInterestedUsers(event, 'interested')}
        </Grid>

      </Grid>

    </Grid>

  </div>
</ThemeProvider>
