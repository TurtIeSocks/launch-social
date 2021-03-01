import React, { useState, useEffect } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { Grid, TextField, Button } from '@material-ui/core'
import theme from '../mui/theme.js'
import useStyles from '../eventShow/styling.js'
import Fetch from '../../services/fetch/Fetch.js'

const CommentTile = ({ comment, eventId, handleEditSubmit }) => {
  const classes = useStyles()
  const [commentRecord, setCommentRecord] = useState({
    comment: ''
  })

  const fetchComment = async (eventId, commentId) => {
    const body = await Fetch.fetchComment(eventId, commentId)
    setCommentRecord(body.comment)
  }

  const editComment = async (eventId, commentId, commentPayload) => {
    await Fetch.editComment(eventId, commentId, commentPayload)
    handleEditSubmit()
  }

  useEffect(() => {
    fetchComment(eventId, comment.id)
  }, [])

  const handleChange = (event) => {
    setCommentRecord({
      ...commentRecord,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    editComment(eventId, comment.id, commentRecord)
    setCommentRecord({ comment: "" })
  }

  return (
    <ThemeProvider theme={theme}>
      <form className={classes.formSpacing} onSubmit={onSubmitHandler}>
        <Grid container item
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={6}>
            <TextField
              className={classes.formInput}
              fullWidth={true}
              name="comment"
              id="outlined-comment"
              label="Leave a Comment..."
              value={commentRecord.comment}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3} >
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button color="secondary" onClick={() => handleEditSubmit(comment.id)}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </ThemeProvider >
  )
}

export default CommentTile