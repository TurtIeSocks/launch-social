import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { Grid, TextField, Button, Tooltip } from '@material-ui/core'
import theme from '../mui/theme.js'
import useStyles from './styling.js'
import Fetch from '../../services/fetch/Fetch.js'

const NewComment = ({ thisEvent, setThisEvent, user }) => {
  const classes = useStyles()
  const [commentRecord, setCommentRecord] = useState({
    comment: ""
  })

  const newComment = async (commentPayload) => {
    const body = await Fetch.newComment(thisEvent.id, commentPayload)
    setThisEvent({ ...thisEvent, comments: [...thisEvent.comments, body.comment] })
  }

  const handleChange = (event) => {
    setCommentRecord({
      ...commentRecord,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    newComment(commentRecord)
    setCommentRecord({ comment: "" })
  }

  const isDisabled = !user ? true : false
  const toolTipText = user ? 'Submit New Comment' : 'Sign in to Use'

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={onSubmitHandler}
        autoComplete='off'
        className={classes.formSpacing}
      >
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={10}>
            <TextField
              className={classes.formInput}
              fullWidth={true}
              name="comment"
              id="outlined-comment"
              helperText={user ? "Leave a Comment..." : 'Sign in to add a Comment'}
              value={commentRecord.comment}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </Grid>
          <Grid item xs={2}>
            <Tooltip title={toolTipText}>
              <span>
                <Button variant="contained" color="secondary" type="submit" disabled={isDisabled}>
                  Submit
                </Button>
              </span>
            </Tooltip>
          </Grid>
        </Grid>
      </form>
    </ThemeProvider >
  )
}

export default NewComment
