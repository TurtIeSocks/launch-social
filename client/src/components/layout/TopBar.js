import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import { AppBar, Toolbar, ThemeProvider, Typography, IconButton, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle, AddBox } from '@material-ui/icons/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import SignOutButton from '../authentication/SignOutButton'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'white'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  avatar: {
    maxWidth: 30,
    maxHeight: 30,
    borderRadius: 10
  },
  logo: {
    margin: theme.spacing(1),
    width: 65
  },
  link: {
    color: 'white'
  }
}))

const theme = createMuiTheme({
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
})

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

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color='secondary'>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.link}><img className={classes.logo} src='https://i.imgur.com/hAOtbjn.png' />&nbsp;Launch Social</Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              {user ?
                <Link to="/new-event" className={classes.link}>
                  <AddBox />&nbsp;Add an Event
                </Link> :
                <a href="/auth/github">
                  <AddBox />&nbsp;Add an Event
                </a>
              }
            </Typography>
            {user && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <img src={user.avatarUrl} className={classes.avatar} />
              &nbsp;{user.username}&nbsp;
                <AccountCircle />
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
                    <Link to="/user-profile">Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <SignOutButton />
                  </MenuItem>
                </Menu>
              </div>
            )}
            {!user && (
              <a href='/auth/github' className={classes.link}><FontAwesomeIcon icon={faGithub} /> Sign In with GitHub</a>
            )}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  )
}

export default TopBar
