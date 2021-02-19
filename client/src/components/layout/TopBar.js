import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { AppBar, Toolbar, ThemeProvider, Typography, IconButton, Menu, MenuItem, Grid, Button } from '@material-ui/core'
import { AccountCircle, AddBox } from '@material-ui/icons/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import theme from '../mui/theme.js'
import useStyles from './styling.js'
import SignOutButton from '../authentication/SignOutButton'

const TopBar = ({ user }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const getAddEventLink = user => {
    if (user) {
      return (
        <Link to="/new-event" className={classes.link}>
          <Typography align='center'><AddBox className={classes.add} />&nbsp;Add an Event</Typography>
        </Link>
      )
    } else {
      return (
        <a href="/auth/github">
          <Typography align='center'><AddBox className={classes.add}/>&nbsp;Add an Event</Typography>
        </a>
      )
    }
  }

  const getSignInOut = user => {
    if (user) {
      return (
        <>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Typography variant='subtitle1'>{user.username}</Typography>
          &nbsp;<AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              {/* <Link to="/user-profile">
                <Button variant="contained" color="secondary">
                &nbsp;Profile&nbsp;
                </Button>
              </Link> */}
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <SignOutButton />
            </MenuItem>
          </Menu>
        </>
      )
    } else {
      return (
        <a href='/auth/github' className={classes.link}>
          <FontAwesomeIcon icon={faGithub} /> Sign In with GitHub
        </a>
      )
    }
  }

  return (
    <div className={classes.topBar}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color='secondary'>
          <Toolbar>
            <Grid container
              direction="row"
              justify="space-between"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={1} className={classes.left}>
                <Link to="/" className={classes.link}>
                  <img className={classes.logo} src='https://i.imgur.com/hAOtbjn.png' />
                </Link>
              </Grid>
              <Grid item xs={3} >
                <Link to="/" className={classes.link}>
                  <Typography variant="h6" align='left' >
                    Launch Social
                    </Typography>
                </Link>
              </Grid>
              <Grid item xs={4} >
                <Typography variant="subtitle1" align='center'>
                  {getAddEventLink(user)}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" align='right'>
                  {getSignInOut(user)}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  )
}

export default TopBar
