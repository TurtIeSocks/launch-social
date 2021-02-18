import React, { useState } from "react"
import Button from '@material-ui/core/Button'
import theme from '../mui/theme.js'
import { ThemeProvider } from "@material-ui/styles"

const SignOutButton = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const signOut = (event) => {
    event.preventDefault()
    fetch("/api/v1/user-sessions", {
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json().then(() => {
          setShouldRedirect(true)
          return { status: "ok" }
        })
      } else {
        const errorMessage = `${resp.status} (${resp.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
    })
  }

  if (shouldRedirect) {
    location.href = "/"
  }

  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary" onClick={signOut}>
        Sign Out
    </Button>
    </ThemeProvider>
  )
}

export default SignOutButton
