import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { Grid, Button, Typography } from '@material-ui/core'
import theme from '../mui/theme.js'
import useStyles from '../eventShow/styling.js'
import Fetch from '../../services/fetch/Fetch.js'

const DeleteComment = ({ thisEvent, comment, handleEditSubmit }) => {
  const classes = useStyles()

  const deleteComment = async (commentId) => {
    await Fetch.deleteComment(thisEvent.id, commentId)
    handleEditSubmit()
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container item
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Typography variant='h6'>
            Delete Comment?
            </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button color="primary" onClick={() => deleteComment(comment.id)}>
            Yes
            </Button>
        </Grid>
        <Grid item xs={3}>
          <Button color="secondary" onClick={() => handleEditSubmit(comment.id)}>
            No
            </Button>
        </Grid>
      </Grid>
    </ThemeProvider >
  )
}

export default DeleteComment