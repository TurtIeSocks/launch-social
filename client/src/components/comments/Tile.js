import React from 'react'
import { Button, ThemeProvider, Grid, Typography, Divider, Avatar } from '@material-ui/core'
import theme from '../mui/theme.js'
import useStyles from './styling.js'

const CommentTile = ({ comment, user, index, last, setCommentState }) => {
  const classes = useStyles()

  const handleEditClick = event => {
    setCommentState({ id: comment.id, edit: true })
  }

  const handleDeleteClick = event => {
    setCommentState({ id: comment.id, edit: false })
  }

  let editButton, deleteButton = ''
  if (user !== null && user !== undefined) {
    if (user.id == comment.userId) {
      editButton =
        <>
          <Button onClick={handleEditClick} color='secondary'>
            Edit
          </Button>
        </>
      deleteButton =
        <>
          <Button onClick={handleDeleteClick} color='primary'>
            Delete
          </Button>
        </>
    }
  }
  let commentBackground = ''

  return (
    <ThemeProvider theme={theme}>
      <Grid container item xs={12}
        direction="row"
        alignItems="center"
        className={eval(commentBackground)}
        spacing={1}
      >
        <Grid item xs={1}>
          <Avatar src={comment.userInfo.avatarUrl} className={classes.avatar} />
        </Grid>
        <Grid item xs={4} sm={2}>
          <Typography style={{ overflowWrap: 'break-word' }}>
            <a href={comment.userInfo.profileUrl}>{comment.userInfo.username}</a>
          </Typography>
        </Grid>
        <Grid item xs={7} sm={6} zeroMinWidth>
          <Typography style={{ overflowWrap: 'break-word' }}>
            {comment.comment}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          {editButton}
          {deleteButton}
        </Grid>
      </Grid>
      {index !== last && <Grid item xs={12}>
        <Divider className={classes.divider} light />
      </Grid>}
    </ThemeProvider>
  )
}

export default CommentTile